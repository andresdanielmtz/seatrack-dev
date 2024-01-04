from flask import session, jsonify, request, Blueprint
from utils.utils import get_user_db_connection
import sys

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")

    try:
        conn = get_user_db_connection()
        cursor = conn.cursor()
    except:
        print("Error connecting to database", file=sys.stderr)

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


@auth_blueprint.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_user_db_connection()
    cursor = conn.cursor()

    # Check if username already exists
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    print(f"REGISTERING: {username}, {password}", file=sys.stderr)
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)", (username, password)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Registration Complete!"})


@auth_blueprint.route("/logout")
def logout():
    # Clear session data upon logout
    session.pop("logged_in", None)
    session.pop("username", None)
    return jsonify({"message": "Logged out"})


@auth_blueprint.route("/protected")
def protected():
    # Check if user is logged in before accessing this endpoint
    if "logged_in" in session and session["logged_in"]:
        return jsonify(
            {"message": "You are logged in! Access granted to protected endpoint"}
        )
    return jsonify({"message": "You are not logged in! Access denied"}), 401
