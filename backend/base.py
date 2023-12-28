from flask import Flask, session, jsonify
from flask_cors import CORS
from flask_session import Session
import sqlite3
import json


app = Flask(__name__)

CORS(app)
Session(app)
SESSION_TYPE = "redis"
app.config.from_object(__name__) ## Taken directly from documentation, not sure what it does (or what doesn't)

# Route to establish a connection to the SQLite database
def get_db_connection():
    conn = sqlite3.connect('coords.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/login")

def login():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Location")  # Replace 'table_name' with the actual table name in the database

    rows = cursor.fetchall()
    columns = [column[0] for column in cursor.description]

    result = []
    for row in rows:
        result.append(dict(zip(columns, row)))

    conn.close()

    return json.dumps(result)


@app.route("/profile")
def profile():
    response_body = {
        "name": "Andres Martinez",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

if __name__ == '__main__':
    app.run(port=5000)
