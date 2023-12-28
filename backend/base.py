from flask import Flask 
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/profile")
def profile():
    response_body = {
        "name": "Andres Martinez",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

if __name__ == '__main__':
    app.run(port=5000)
