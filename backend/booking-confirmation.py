import json
import os
import sys
from datetime import datetime

# Add path to the directory containing pyodbc
sys.path.append('/opt/python')

import pyodbc

def lambda_handler(event, context):
    response = {}
    
    print("Event: ", event)
    
    # Extract unique identifier from event or path parameters
    unique_identifier = event.get('bookingId')
    
    if not unique_identifier and 'pathParameters' in event:
        unique_identifier = event['pathParameters'].get('proxy')
    
    if not unique_identifier:
        response = {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': {'error': 'Unique identifier is required'}
        }
    else:
        # Fetch environment variables
        server = os.environ['DB_HOST']
        database = os.environ['DB_NAME']
        username = os.environ['DB_USER']
        password = os.environ['DB_PASSWORD']
        port = os.environ['DB_PORT']
        
        # Construct connection string
        connection_string = f"DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server},{port};DATABASE={database};UID={username};PWD={password}"
        
        conn = None
        cursor = None

        try:
            # Establish database connection
            conn = pyodbc.connect(connection_string)
            cursor = conn.cursor()

            # Query the bookings table for the given unique identifier
            cursor.execute("""
                SELECT user_id, phone_number, service_title, service_price, start_date, end_date
                FROM Bookings
                WHERE unique_identifier = ?
            """, (unique_identifier,))
            bookings = cursor.fetchall()

            if not bookings:
                response = {
                    'statusCode': 404,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': {'error': 'No bookings found for the given unique identifier'}
                }
            else:
                # Calculate total price and prepare response
                total_price = 0
                services = []
                user_id = None
                phone_number = None
                start_date = None
                end_date = None
                
                for booking in bookings:
                    user_id, phone_number, service_title, service_price, start_date, end_date = booking
                    total_price += service_price
                    services.append({
                        'title': service_title,
                        'price': service_price,
                        'count': 1
                    })

                # # Format dates to ISO 8601 string format
                # start_date = start_date.isoformat() + 'Z'
                # end_date = end_date.isoformat() + 'Z'
                
                # Format dates to only include the date part (YYYY-MM-DD)
                start_date = start_date.strftime('%Y-%m-%d')
                end_date = end_date.strftime('%Y-%m-%d')
                
                # Form response object
                response_body = {
                    'endDate': end_date,
                    'phoneNumber': phone_number,
                    'services': services,
                    'startDate': start_date,
                    'userId': user_id,
                    'totalAmount': total_price,
                    'bookingId': unique_identifier
                }

                response = {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': response_body
                }

        except pyodbc.Error as e:
            # Handle database connection errors
            print(f"Database error: {str(e)}")
            response = {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': {'error': f'Database error: {str(e)}'}
            }

        except Exception as e:
            # Handle other exceptions
            print(f"Unhandled exception: {str(e)}")
            response = {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': {'error': f'Unhandled exception: {str(e)}'}
            }

        finally:
            # Ensure the cursor and connection are closed properly
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    print("Response that is being sent to FE", response)
    
    # Ensure the response body is correctly JSON-encoded for the final response
    return {
        'statusCode': response['statusCode'],
        'headers': response['headers'],
        'body': response['body']
    }
