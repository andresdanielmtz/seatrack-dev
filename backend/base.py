from flask import Flask, session, jsonify, request
from flask_cors import CORS
from flask_session import Session
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config['SESSION_TYPE'] = 'filesystem'
app.config.from_object(__name__)

CORS(app)
Session(app)

SESSION_TYPE = "redis"

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# Route to establish a connection to the SQLite database
def get_coord_db_connection():
    conn = sqlite3.connect('coords.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_user_db_connection():
    conn = sqlite3.connect("userbase.db")
    conn.row_factory = sqlite3.Row
    return conn 

@app.route("/coords", methods=["POST", "GET"])
def coords():
    conn = get_coord_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Location")

    rows = cursor.fetchall()
    columns = [column[0] for column in cursor.description]

    result = []
    for row in rows:
        result.append(dict(zip(columns, row)))

    conn.close()

    return jsonify(result)  # Return JSON response


@app.route("/profile")
def profile():
    response_body = {
        "name": "Andres Martinez",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route("/login", methods = ["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_user_db_connection()
    cursor = conn.cursor()

    # Retrieve the hashed password for the provided username
    cursor.execute('SELECT password FROM users WHERE username = ?', (username,))
    stored_password = cursor.fetchone()

    conn.close()

    if stored_password:
        stored_password = stored_password['password']
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        if stored_password == hashed_password:
            session['logged_in'] = True
            session['username'] = username
            return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': "Invalid Credentials"}), 401

@app.route('/register', methods = ['POST'])
def register():
    username = request.json.get("username")
    password = request.json.get("password") 
    hashed_password = hash_password(password)

    conn = get_user_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", username, hashed_password)
    return jsonify({"message": "Registration Complete!"})


@app.route('/logout')
def logout():
    # Clear session data upon logout
    session.pop('logged_in', None)
    session.pop('username', None)
    return jsonify({'message': 'Logged out'})

@app.route('/protected')
def protected():
    # Check if user is logged in before accessing this endpoint
    if 'logged_in' in session and session['logged_in']:
        return jsonify({'message': 'You are logged in! Access granted to protected endpoint'})
    return jsonify({'message': 'You are not logged in! Access denied'}), 401


if __name__ == '__main__':
    app.run(port=5000)
