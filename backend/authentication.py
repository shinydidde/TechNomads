import json
import os
import sys

# Add path to the directory containing pyodbc
sys.path.append('/opt/python')

import pyodbc

def lambda_handler(event, context):
    response = {}
    # TODO implement
    
    print("Event: ", event)
    # print("Context: ", context)
    
    # Extracting values
    uid = event['uid']
    email = event['email']
    display_name = event['displayName']
    
    
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

        # Query to check if the user exists
        cursor.execute("SELECT * FROM Users WHERE email = ?", (email,))
        rows = cursor.fetchall()
        
        print("rows", rows)
        
        if not rows:
            # User does not exist, create the user
            
            print("Coming into Creating the User Account")
            cursor.execute(
                "INSERT INTO Users (email, name, uid_google, phone) VALUES (?, ?, ?, ?)",
                (email, display_name, uid, '000000000')
            )
            conn.commit()  # Commit the transaction
            
            #Acknowledging  to the User
            response = {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(f'Your Signed Successfully, {display_name}')
            }
            
        else:
            #User Already exists
            
            print("User Already present")
            response = {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(f'Welcome {display_name}, Thanks for Choosing us')
            }

    
    except pyodbc.Error as e:
        # Handle database connection errors
        response = {
            'statusCode': 500,
            'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body': json.dumps({'error': str(e)})
        }

    except Exception as e:
        # Handle other exceptions
        response = {
            'statusCode': 500,
            'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body': json.dumps({'error': f'Unhandled exception: {str(e)}'})
        }
    
    finally:
    # Ensure the cursor and connection are closed properly
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            
    print("Reponse that is being sent to FE", response)
    
    return response
