from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

predict_bp = Blueprint("predict", __name__)
CORS(predict_bp)  # Enable CORS for this blueprint

# Load trained model
model = joblib.load("models/crop_model.pkl")

@predict_bp.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from JSON request
        data = request.json
        features = [
            data['Nitrogen'], data['Phosphorous'], data['Potassium'],
            data['Temperature'], data['Humidity'], data['PH'], data['Rainfall']
        ]

        # Convert to NumPy array and reshape
        input_data = np.array(features, dtype=float).reshape(1, -1)

        # Make a prediction
        prediction = model.predict(input_data)

        return jsonify({'prediction': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)})
