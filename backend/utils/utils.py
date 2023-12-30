import hashlib 
import sqlite3 

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# Route to establish a connection to the SQLite database
def get_coord_db_connection():
    conn = sqlite3.connect("coords.db")
    conn.row_factory = sqlite3.Row
    return conn


def get_user_db_connection():
    conn = sqlite3.connect("userbase.db")
    conn.row_factory = sqlite3.Row
    return conn