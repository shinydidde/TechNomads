import json
import os
import sys

# Add path to the directory containing pyodbc
sys.path.append('/opt/python')

import pyodbc

def lambda_handler(event, context):
    response_body = {}
    status_code = 200

    try:
        # Extract the bookingId from the event
        booking_id = event.get('bookingId')

        if not booking_id:
            response_body = {'error': 'bookingId is required'}
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

                # Check if the booking exists
                cursor.execute("""
                    SELECT COUNT(*) FROM Bookings WHERE unique_identifier = ?
                """, (booking_id,))
                if cursor.fetchone()[0] == 0:
                    response_body = {'error': 'Booking not found'}
                    status_code = 404
                else:
                    # Delete the booking
                    cursor.execute("""
                        DELETE FROM Bookings WHERE unique_identifier = ?
                    """, (booking_id,))
                    conn.commit()
                    response_body = {'message': 'Booking deleted successfully'}

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

    except Exception as e:
        # Handle unexpected exceptions
        print(f"Unexpected error: {str(e)}")
        response_body = {'error': 'Unexpected error occurred'}
        status_code = 500

    # Format the final response
    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,DELETE'
        },
        'body': response_body
    }

    print("Response that is being sent to FE", response)
    return response
