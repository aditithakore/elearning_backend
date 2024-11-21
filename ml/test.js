const express = require('express');
const bodyParser = require('body-parser');
const pickle = require('node-pickle'); // Use node-pickle directly
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());


let model;
try {
    model = pickle.loads(fs.readFileSync('ml/disability_classifier_model.pkl', 'binary')); // 'binary' encoding important
    console.log("Model loaded successfully");
} catch (loadError) {
    console.error("Error loading pickle model:", loadError);
    process.exit(1);
}




app.post('/predict', (req, res) => {

    const weightedAnswers = req.body.weights;



    if (!weightedAnswers || !Array.isArray(weightedAnswers)) {
        return res.status(400).json({ error: 'Invalid input: weights must be an array.' });
    }



    try {
        const inputArray = [weightedAnswers];

        const probabilities = model.predict_proba(inputArray)[0];


        const disabilities = [
            "Cognitive", "nan", "Auditory", "Visual", "Dyslexia",
            "Autism Spectrum Disorder", "Dysgraphia", "ADHD",
            "Developmental Delay", "speech and language delay",
            "Dyscalculia", "Other"
        ];


        const results = {};
        for (let i = 0; i < disabilities.length; i++) {
            results[disabilities[i]] = probabilities[i];
        }


        res.json(results);

    } catch (predictionError) {
        console.error("Error during prediction:", predictionError);
        return res.status(500).json({ error: 'Prediction failed: ' + predictionError.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});