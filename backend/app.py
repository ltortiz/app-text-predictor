from transformers import MarianMTModel, MarianTokenizer
from flask import Flask, request, jsonify
import torch
import joblib
import numpy as np

# Inicializamos Flask
app = Flask(__name__)

# Cargar el modelo de MarianMT para la traducción (automáticamente detecta el idioma)
model_name = "Helsinki-NLP/opus-mt-ROMANCE-en"  # Un modelo multilingüe que traduce a inglés
model_trasnlate = MarianMTModel.from_pretrained(model_name)
tokenizer_translate = MarianTokenizer.from_pretrained(model_name)

# Cargamos el modelo y el escalador del text prediction
scaler  = joblib.load('vectorizer.pkl')
model = joblib.load('model.pkl')

#Definir el endpoint de predicción
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener los datos desde el cuerpo de la solicitud
        data = request.get_json()

        # Asegurarse que los datos contienen los features correctos
        input_data = data['text']
        print("Recibido: "+input_data)

        # Traducir el texto al inglés usando MarianMT (modelo de IA)
        translated = translate_text(input_data)
        print("Traducido: "+translated)

        # Normalizar los datos con el scaler
        input_data_scaled = scaler.transform([translated])

        # Define label mapping
        label_mapping = {
            0: "Tristeza", #"Sadness",
            1: "Alegría", #"Joy",
            2: "Amor", #"Love",
            3: "Ira", #"Anger",
            4: "Miedo", #"Fear",
            5: "Sorpresa", #"Surprise"
        }

        # Hacer la predicción
        prediction = model.predict(input_data_scaled)
        label_prediction = label_mapping[prediction[0]]
        prediction_proba = model.predict_proba(input_data_scaled)
        num_probability = prediction_proba[0][prediction][0]
        label_probabilty = num_probability * 100

        # Devolver la predicción como JSON
        return jsonify({'prediction': label_prediction, 'probability': label_probabilty})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

def translate_text(text):
    """
    Función que utiliza MarianMT para traducir texto a inglés.
    """
    # Tokenizar el texto
    translated = tokenizer_translate.encode(text, return_tensors="pt", truncation=True, padding=True)

    # Traducir usando el modelo de MarianMT
    with torch.no_grad():
        translated_tokens = model_trasnlate.generate(translated, max_length=512, num_beams=4, early_stopping=True)

    # Decodificar el texto traducido
    translated_text = tokenizer_translate.decode(translated_tokens[0], skip_special_tokens=True)
    return translated_text

if __name__ == '__main__':
    # Ejecutar la aplicación Flask
    app.run(host='0.0.0.0', port=8585)