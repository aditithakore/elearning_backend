import sys
import json
import joblib  # Assuming you are using joblib to load your model
import numpy as np

# Load the model
try:
  model = joblib.load("C:\\elearning_backend\\ml\\disability_classifier_model.pkl") # Replace with your model path
except Exception as e:
    print(f"Error loading model: {e}", file=sys.stderr)
    sys.exit(1)  # Exit with error code



# Get the input data from Node.js
try:

    input_data_str = sys.argv[1]

    input_data = json.loads(input_data_str)

    print("data loaded")
    input_array = np.array(input_data).reshape(1, -1)
    print(input_array)

except (IndexError, json.JSONDecodeError) as e:


    print(f"Error processing input: {e}", file=sys.stderr)
    sys.exit(1)


try:

  probabilities = model.predict_proba(input_array)[0].tolist() # Get probabilities and convert to list

  print(probabilities)

  # Example disabilities (replace with your actual disabilities list)
  disabilities = [
      "Cognitive", "nan", "Auditory", "Visual", "Dyslexia", 
      "Autism Spectrum Disorder", "Dysgraphia", "ADHD", 
      "Developmental Delay", "speech and language delay", 
      "Dyscalculia", "Other"
  ]



  results = {disability: probability for disability, probability in zip(disabilities, probabilities)}

  # Send the results back to Node.js as a JSON string
  print(json.dumps(results))


except Exception as e:
    print(f"Error during prediction: {e}", file=sys.stderr)
    sys.exit(1)