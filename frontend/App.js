import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

// Función para validar el formato de la IP
const isValidIP = (ip) => {
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
};

export default function App() {
  const [serverIp, setServerIp] = useState('');
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [ipError, setIpError] = useState(false); // Error de validación de IP

  // Limpiar resultados si el campo de texto está vacío
  useEffect(() => {
    if (!text) {
      setPrediction(null);
      setProbability(null);
    }
  }, [text]);

  // Validación de la IP
  const handleIpChange = (ip) => {
    setServerIp(ip);
    if (ip && !isValidIP(ip)) {
      setIpError(true);
    } else {
      setIpError(false);
    }
  };

  // Limpiar el error cuando el usuario sale del campo IP
  const handleIpBlur = () => {
    if (serverIp && !isValidIP(serverIp)) {
      setIpError(true);
    } else {
      setIpError(false);
    }
  };

  const handlePredict = async () => {
    if (!serverIp || !text || ipError) {
      return; // No ejecutar la predicción si la IP no es válida
    }

    try {
      const response = await axios.post(`http://${serverIp}:8585/predict`, { text });
      const { prediction, probability } = response.data;
      setPrediction(prediction);
      setProbability(probability.toFixed(2));  // Formatear la probabilidad a 2 decimales
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/006/873/036/non_2x/colorful-emotions-seamless-pattern-cute-circle-smile-faces-on-black-background-geometrical-fabric-design-for-kids-textile-funny-illustration-vector.jpg' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Predecir Emoción</Text>
        <Text style={styles.subtitle}>Elaborado por: Leidy Ortiz</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, ipError && styles.inputError]} // Añadir estilo de error si la IP es inválida
            placeholder="Ingresa la IP del servidor"
            value={serverIp}
            onChangeText={handleIpChange}
            onBlur={handleIpBlur} // Validar al salir del campo
          />
          {ipError && (
            <Text style={styles.errorText}>IP no válida. Asegúrate de que esté en formato correcto.</Text> // Envolver el texto en <Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el texto para predecir"
            value={text}
            onChangeText={setText}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: !serverIp || ipError ? 0.7 : 1 }]} // Opacidad para cuando el botón está deshabilitado
          onPress={handlePredict}
          disabled={!serverIp || ipError}
        >
          <Text style={styles.buttonText}>Predecir</Text>
        </TouchableOpacity>

        {prediction && probability !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Predicción: {prediction}</Text>
            <Text style={styles.resultText}>Probabilidad: {probability}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.8,  // Reducir opacidad para que el contenido sea visible
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente para mejorar la legibilidad
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Cambiar color a blanco para resaltar sobre el fondo
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});

