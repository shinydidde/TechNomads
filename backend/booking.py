import json
import os
import sys
import uuid
from datetime import datetime

# Add path to the directory containing pyodbc
sys.path.append('/opt/python')

import pyodbc

def generate_unique_identifier():
    return uuid.uuid4().hex[:12]

def lambda_handler(event, context):
    response = {}
    
    print("Event: ", event)
    
    # Extracting values from the event
    user_id = event['userId']
    phone_number = event['phoneNumber']
    services = event['services']
    start_date = datetime.strptime(event['startDate'], '%Y-%m-%dT%H:%M:%S.%fZ')
    end_date = datetime.strptime(event['endDate'], '%Y-%m-%dT%H:%M:%S.%fZ')
    
    # Generate unique identifier for the booking
    unique_identifier = generate_unique_identifier()
    
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
        cursor.execute("SELECT * FROM Users WHERE uid_google = ?", (user_id,))
        user_row = cursor.fetchone()
        
        print("User Info", user_row)

        if not user_row:
            # User does not exist, respond with "Invalid user"
            response = {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': 'Invalid user'})
            }
        else:
            # Update phone number in Users table
            cursor.execute("UPDATE Users SET phone = ? WHERE uid_google = ?", (phone_number, user_id))

            # Create a list of tuples to batch insert into the Bookings table
            bookings = [
                (user_id, phone_number, service['title'], service['price'], start_date, end_date, unique_identifier)
                for service in services
            ]

            # Insert all booking details into the Bookings table in one call
            cursor.executemany("""
                INSERT INTO Bookings (user_id, phone_number, service_title, service_price, start_date, end_date, unique_identifier)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, bookings)
            
            conn.commit()  # Commit the transaction

            # Acknowledging to the User
            response = {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': {'message': 'Booking created successfully', 'uniqueIdentifier': unique_identifier}
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
    
    # Ensure the response body is correctly JSON-encoded for the final response
    response_json = {
        'statusCode': response['statusCode'],
        'headers': response['headers'],
        'body': response['body']
    }
    
    print("Response that is being sent to FE", json.dumps(response_json, indent=4))
    
    return response_json
