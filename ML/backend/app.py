from flask import Flask, send_from_directory
from flask_cors import CORS
from api.predict import predict_bp
import os

app = Flask(__name__, static_folder="../frontend/dist")  # Adjusted for Vite build
CORS(app)  # Allow frontend access

# Register API routes
app.register_blueprint(predict_bp)

# Serve React frontend
@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
