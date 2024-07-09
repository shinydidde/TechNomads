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

    # Extract user ID from query string parameters
    user_id = event.get('pathParameters', {}).get('userID')

    if not user_id:
        response = {
            'statusCode': 400,
            'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body': {'error': 'User ID is required'}
        }
        return {
            'statusCode': 400,
            'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body': response['body']
        }

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

        # Check if the user exists in the Users table
        cursor.execute("SELECT uid_google FROM Users WHERE uid_google = ?", (user_id,))
        user_row = cursor.fetchone()

        if not user_row:
            response = {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': {'error': 'User not found'}
            }
        else:
            uid_google = user_row.uid_google

            # Query the bookings table for the given user ID
            cursor.execute("""
                SELECT booking_id, phone_number, service_title, service_price, start_date, end_date, unique_identifier
                FROM Bookings
                WHERE user_id = ?
            """, (user_id,))
            bookings = cursor.fetchall()

            if not bookings:
                response = {
                    'statusCode': 404,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': {'error': 'No bookings found for the given user ID'}
                }
            else:
                # Prepare response
                bookings_dict = {}
                current_date = datetime.now().date()

                for booking in bookings:
                    booking_id, phone_number, service_title, service_price, start_date, end_date, unique_identifier = booking

                    start_date_str = start_date.strftime('%Y-%m-%d')
                    end_date_str = end_date.strftime('%Y-%m-%d')
                    status = 'inactive' if end_date.date() < current_date else 'active'

                    if unique_identifier not in bookings_dict:
                        bookings_dict[unique_identifier] = {
                            'bookingId': unique_identifier,
                            'startDate': start_date_str,
                            'endDate': end_date_str,
                            'phoneNumber': phone_number,
                            'services': [],
                            'totalAmount': 0.0,
                            'userId': uid_google,
                            'status': status
                        }

                    bookings_dict[unique_identifier]['services'].append({
                        'title': service_title,
                        'price': float(service_price),
                        'count': 1
                    })

                    bookings_dict[unique_identifier]['totalAmount'] += float(service_price)
                    
                    # # Add 4 to the totalAmount for each booking
                    # for booking in bookings_dict.values():
                    #     booking['totalAmount'] += 4
                    
                # Add 4 to the totalAmount for each booking
                for booking in bookings_dict.values():
                    booking['totalAmount'] += 4

                response = {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': {'bookings': list(bookings_dict.values())}
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

    # Use json.dumps only once at the end
    response['body'] = response['body']

    return response
