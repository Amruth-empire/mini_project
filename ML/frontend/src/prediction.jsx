import React, { useState } from "react";

function Predict() {
    const [formData, setFormData] = useState({
        Nitrogen: "",
        Phosphorous: "",
        Potassium: "",
        Temperature: "",
        Humidity: "",
        PH: "",
        Rainfall: ""
    });

    const [predictionResult, setPredictionResult] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setPredictionResult(result.prediction || "Error in prediction");
        } catch (error) {
            console.error("Error:", error);
            setPredictionResult("Error fetching prediction");
        }
    };

    return (
        <div className="login">
            <h1>CROP PREDICTION MODEL</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                    />
                ))}
                <button type="submit">Predict</button>
            </form>
            <h1 id="predi">{predictionResult}</h1>
        </div>
    );
}

export default Predict;
