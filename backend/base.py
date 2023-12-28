from flask import Flask 

app = Flask(__name__)

@app.route("/profile")
def profile():
    response_body = {
        "name": "Andres Martinez",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

