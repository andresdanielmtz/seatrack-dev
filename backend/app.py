from flask import Flask, session, jsonify, request
from flask_cors import CORS
from flask_session import Session
from utils.utils import get_coord_db_connection, get_user_db_connection, hash_password
import sys

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config["SESSION_TYPE"] = "filesystem"
app.config.from_object(__name__)

CORS(app)
Session(app)

SESSION_TYPE = "redis"


@app.route("/coords", methods=["GET", "POST"])
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


@app.route("/register_coord", methods=["POST"])
def register_coord():
    lat = request.json.get("latitude")
    lng = request.json.get("longitude")
    name = request.json.get("name")

    conn = get_coord_db_connection()
    cursor = conn.cursor()

    print(f"REGISTERING: {lat}, {lng}, {name}", file=sys.stderr)
    cursor.execute(
        "INSERT INTO Location (name, latitude, longitude) VALUES (?, ?, ?)",
        (name, lat, lng),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Registration Complete!"})


@app.route("/profile")
def profile():
    response_body = {
        "name": "Andres Martinez",
        "about": "Hello! I'm a full stack developer that loves python and javascript",
    }

    return response_body


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")

    conn = get_user_db_connection()
    cursor = conn.cursor()

    # Retrieve the hashed password for the provided username
    cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
    stored_password = cursor.fetchone()

    conn.close()
    print(f"LOGIN: {username}", file=sys.stderr)

    if stored_password:
        stored_password = stored_password["password"]
        session["logged_in"] = True
        session["username"] = username
        return jsonify({"message": "Login successful"}), 200

    return (
        jsonify(
            {
                "message": "Invalid Credentials",
                "username": username,
                "password": stored_password,
            }
        ),
        401,
    )


@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_user_db_connection()
    cursor = conn.cursor()

    print(f"REGISTERING: {username}, {password}", file=sys.stderr)
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)", (username, password)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Registration Complete!"})


@app.route("/logout")
def logout():
    # Clear session data upon logout
    session.pop("logged_in", None)
    session.pop("username", None)
    return jsonify({"message": "Logged out"})


@app.route("/protected")
def protected():
    # Check if user is logged in before accessing this endpoint
    if "logged_in" in session and session["logged_in"]:
        return jsonify(
            {"message": "You are logged in! Access granted to protected endpoint"}
        )
    return jsonify({"message": "You are not logged in! Access denied"}), 401


if __name__ == "__main__":
    app.run(port=5000)
