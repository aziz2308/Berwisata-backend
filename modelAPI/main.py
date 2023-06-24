from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pandas as pd
import requests
from sklearn.preprocessing import LabelEncoder

model = tf.keras.models.load_model('model.h5')

data = pd.read_csv('dataset.csv')
data['Weather'] = data['Weather'].str.strip()
weather_mapping = {'Sunny': 0, 'Rain': 1}
data['Weather'] = data['Weather'].map(weather_mapping)
label_encoder = LabelEncoder()
data['City_1'] = label_encoder.fit_transform(data['City_1'])
X = data[['Weather', 'City_1']].values
y = data['Place_Name'].values

city_coordinates = {
    "Jakarta Pusat": {"lat": -6.186486, "lon": 106.834091},
    "Jakarta Barat": {"lat": -6.135200, "lon": 106.813301},
    "Jakarta Timur": {"lat": -6.230702, "lon": 106.882744},
    "Jakarta Selatan": {"lat": -6.300641, "lon": 106.814095},
    "Jakarta Utara": {"lat": -6.138414, "lon": 106.863956}
}
weather_mapping = {'clear': 'sunny', 'clouds': 'sunny', 'haze': 'sunny', 'rain': 'rain', 'drizzle': 'rain', 'thunderstorm': 'rain', 'squall': 'rain'}

app = Flask(__name__)

@app.route('/weather', methods=['POST'])
def recommend_attractions():
    user_data = request.get_json()
    user_city = user_data['user_city']
    user_lat = city_coordinates[user_city]["lat"]
    user_lon = city_coordinates[user_city]["lon"]
    api_key = "6efe5d86568540c60dfc5ba4a75a7bbe"
    api_url = f"http://api.openweathermap.org/data/2.5/weather?lat={user_lat}&lon={user_lon}&appid={api_key}"
    response = requests.get(api_url)
    weather_description = response.json()["weather"][0]["main"].lower()
    user_weather = weather_mapping.get(weather_description, 'unknown')
    user_weather_encoded = [int(user_weather.lower() == category) for category in ['sunny', 'rain']]
    user_weather_encoded = np.array([[user_weather_encoded]])
    
    city_filter = data['City_1'] == label_encoder.transform([user_city])[0]
    filtered_X = X[city_filter]
    filtered_y = y[city_filter]
    filtered_label_encoder = LabelEncoder()
    filtered_y_encoded = filtered_label_encoder.fit_transform(filtered_y)

    user_weather_encoded = np.reshape(user_weather_encoded, (1, -1))
    predicted_probabilities = model.predict(user_weather_encoded)
    top_5_indices = np.argsort(predicted_probabilities[0])[-5:][::-1]
    recommended_attractions = filtered_label_encoder.inverse_transform(top_5_indices)
    
    response_data = {
        'city': user_city,
        'weather': weather_description,
        'attractions': recommended_attractions.tolist()
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)