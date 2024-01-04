from flask import Flask
from flask_cors import CORS
from flask_session import Session

from routes.auth import auth_blueprint
from routes.coords import coords_blueprint
from routes.profile import profile_blueprint

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config["SESSION_TYPE"] = "filesystem"
app.config.from_object(__name__)

CORS(app)
Session(app)

app.register_blueprint(auth_blueprint)
app.register_blueprint(coords_blueprint)
app.register_blueprint(profile_blueprint)

SESSION_TYPE = "redis"

if __name__ == "__main__":
    app.run(port=5000)
