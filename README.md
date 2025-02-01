<h1>📱 Predecir Emoción - App Móvil</h1>

<h4>Elaborado por: Leidy Ortiz</h4>

<h2>📖 Descripción</h2>

<p>Esta aplicación móvil permite analizar la emoción de un texto ingresado por el usuario utilizando modelos de inteligencia artificial. Se basa en un backend desarrollado en Python que procesa el texto y retorna una predicción junto con su probabilidad.</p>

<p>El objetivo de esta app es brindar una herramienta útil para análisis de sentimientos en redes sociales, monitoreo de salud mental y aplicaciones de atención al cliente.</p>

<br>

<h2>🎬 Demo</h2>

<p>Para probar la aplicación de manera rápida, escanea el siguiente código QR o abre el enlace en la aplicación Expo Go.</p>

🔗 <a href="https://expo.dev/preview/update?message=Merge%20branch%20'master'%20of%20https%3A%2F%2Fgithub.com%2Fltortiz%2Fapp-text-predictor&updateRuntimeVersion=1.0.0&createdAt=2025-02-01T04%3A37%3A47.650Z&slug=exp&projectId=02152449-1cc8-4ccb-8015-fd8267491fd4&group=ff6829ed-63e5-4807-a01a-059995a3b4a7">Ver Demo</a>
<p>📱 Abre con Expo Go – Escanea el código QR o abre el enlace para probar la app en tu dispositivo móvil.</p>

<br>

<h2>🏗️ Tecnologías utilizadas</h2>

<h3>📌 Frontend</h3>

<ul>
  <li><b>React Native con Expo:</b> Permite una interfaz intuitiva y dinámica para ingresar el texto, visualizar la predicción y la probabilidad de la emoción detectada.</li>
  <li><b>Validación en tiempo real:</b> Se verifica que la IP ingresada sea válida y que el texto no esté vacío antes de enviar la solicitud.</li>
  <li><b>Estilización mejorada:</b> Se utiliza un fondo temático y elementos UI optimizados para mejor experiencia de usuario.</li>
</ul>

<h3>🔍 Backend</h3>

<ul>
  <li><b>Python + Flask:</b> API que recibe el texto, lo traduce al inglés (si es necesario) y lo procesa con un modelo de IA preentrenado.</li>
  <li><b>Modelos de IA:</b> Implementación de modelos avanzados de NLP para detección de emociones en texto.</li>
</ul>

<br>

<h2>🤖 Modelos de Inteligencia Artificial</h2>

<p>La aplicación usa dos modelos preentrenados sin modificaciones:</p>

<h3>1️⃣ Modelo de Traducción - MarianMT</h3>

<p>MarianMT es un framework para modelos de traducción basado en transformer encoder-decoders, similar a BART. Fue desarrollado originalmente por Jörg Tiedemann usando la biblioteca Marian C++, optimizada para entrenamiento y traducción rápida.</p>

<p><b>🔹 Características clave:</b></p>

<ul>
  <li>Traduce texto de múltiples idiomas al inglés.</li>
  <li>Utiliza 6 capas en cada componente (encoder y decoder).</li>
  <li>Usa positional embeddings estáticos y no aplica normalización en embeddings.</li>
  <li>Basado en modelos de la serie Helsinki-NLP/opus-mt-{src}-{tgt}.</li>
  <li>Disponible en más de 1,000 combinaciones de idiomas.</li>
</ul>

<p>Este modelo permite a la aplicación aceptar texto en cualquier idioma y traducirlo al inglés antes de enviarlo al modelo de predicción de emociones.</p>

<b>📌 Más información sobre MarianMT:</b> 
🔗 <a href="https://huggingface.co/docs/transformers/model_doc/marian">Hugging Face - MarianMT</a>

<h3>2️⃣ Modelo de Predicción de Emociones</h3>

<ul>
  <li>Clasifica el texto en diferentes emociones como felicidad, tristeza, enojo, etc.</li>
  <li>Basado en técnicas avanzadas de NLP y aprendizaje automático.</li>
  <li>Precisión del 88.44% en datos de prueba.</li>
  <li>Utiliza regresión logística para la clasificación.</li>
  <li>Puede aplicarse en análisis de redes sociales, atención al cliente y salud mental.</li>
</ul>

<b>📌 Más información sobre el modelo de predicción de emociones:<b>
🔗 <a href="https://www.kaggle.com/models/angelchaudhary/texts-emotions-prediction-model?select=emotions-prediction-model-notebook.ipynb">Ver detalles y código en Google Colab</a>

<br>

<h2>🚀 Instalación y ejecución</h2>

<h3>1️⃣ Clona este repositorio:</h3>

<pre>
  git clone https://github.com/ltortiz/app-text-predictor.git
  cd app-text-predictor
</pre>

<h3>2️⃣ Instala las dependencias:</h3>

<pre>
  npm install
</pre>

<h3>3️⃣ Inicia la aplicación:</h3>

<pre>
  expo start
</pre>

<h3>4️⃣ Ingresa la IP del servidor y un texto para analizar la emoción.</h3>

<br>

<h2>📄 Licencia</h2>

<p>Este proyecto está bajo la licencia MIT.</p>
