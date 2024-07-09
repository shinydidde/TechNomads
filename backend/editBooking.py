import json
import os
import sys
from datetime import datetime

# Add path to the directory containing pyodbc
sys.path.append('/opt/python')

import pyodbc

def lambda_handler(event, context):
    response_body = {}
    status_code = 200

    try:
        
        # Extract booking information from the event
        booking = event
        
        
        if not booking:
            response_body = {'error': 'No booking provided'}
            status_code = 400
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

                unique_identifier = booking.get('bookingId')
                start_date = booking.get('startDate')
                end_date = booking.get('endDate')
                phone_number = booking.get('phoneNumber')
                services = booking.get('services', [])
                user_id = booking.get('userId')

                if not unique_identifier or not start_date or not end_date or not phone_number or not user_id:
                    response_body = {'error': 'Missing booking information'}
                    status_code = 400

                # Update the booking details
                cursor.execute("""
                    UPDATE Bookings
                    SET start_date = ?, end_date = ?, phone_number = ?
                    WHERE unique_identifier = ? AND user_id = ?
                """, (start_date, end_date, phone_number, unique_identifier, user_id))

                # Process services for the booking
                # for service in services:
                #     service_title = service.get('title')
                #     deleted = service.get('deleted')

                #     if deleted == 'yes':
                #         # Delete the service
                #         cursor.execute("""
                #             DELETE FROM Services
                #             WHERE unique_identifier = ? AND title = ?
                #         """, (unique_identifier, service_title))

                conn.commit()

                if status_code == 200:
                    response_body = {'message': 'Bookings updated successfully'}

            except pyodbc.Error as e:
                print(f"Database error: {str(e)}")
                response_body = {'error': f'Database error: {str(e)}'}
                status_code = 500

            except Exception as e:
                print(f"Unhandled exception: {str(e)}")
                response_body = {'error': f'Unhandled exception: {str(e)}'}
                status_code = 500

            finally:
                if cursor:
                    cursor.close()
                if conn:
                    conn.close()

    except json.JSONDecodeError:
        response_body = {'error': 'Invalid JSON format'}
        status_code = 400

    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,DELETE'
        },
        'body': response_body
    }

    print("Response that is being sent to FE", response)
    return response
