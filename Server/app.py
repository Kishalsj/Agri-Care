from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from tensorflow.python.keras.models import load_model
from tensorflow.keras.layers import BatchNormalization
import numpy as np
import json
import bcrypt
from flask_cors import CORS
import tensorflow as tf

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

# Load the trained model
model = load_model('plant_safe.h5', custom_objects={'BatchNormalization': BatchNormalization})
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

PARENT_DIR = os.path.abspath(os.path.join(APP_ROOT, os.pardir))

with open(os.path.join(PARENT_DIR, 'model2', 'class_names.json'), 'r') as f:
    class_names = json.load(f)

model2_path = os.path.join(PARENT_DIR, 'model2',  'cinnamon_leaf_model.pth')

# Load PyTorch model for cinnamon
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model2 = models.resnet18(pretrained=False)
num_classes = len(class_names)
model2.fc = nn.Linear(model2.fc.in_features, num_classes)
model2.load_state_dict(torch.load(model2_path, map_location=device))
model2 = model2.to(device)
model2.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Load class labels
with open('./labels.json', 'r') as f:
    category_names = json.load(f)
    img_classes = list(category_names.values())

# Pre-process uploaded image
def config_image_file(_image_path):
    predict = tf.keras.preprocessing.image.load_img(_image_path, target_size=(224, 224))
    predict_modified = tf.keras.preprocessing.image.img_to_array(predict)
    predict_modified = predict_modified / 255.0
    predict_modified = np.expand_dims(predict_modified, axis=0)
    return predict_modified

# Predict image
def predict_image(image):
    result = model.predict(image)
    return np.array(result[0])

# Prepare prediction output
def output_prediction(filename):
    _image_path = os.path.join(APP_ROOT, "images", filename)
    img_file = config_image_file(_image_path)
    results = predict_image(img_file)
    probability = float(np.max(results))
    index_max = np.argmax(results)

    return {
        "prediction": img_classes[index_max],
        "probability": f"{probability:.4f}"
    }


# Pre-process uploaded image
def config_image_file2(image_path):
    try:
        img = Image.open(image_path).convert("RGB")
        img_tensor = transform(img).unsqueeze(0).to(device)  # [1, C, H, W]
        return img_tensor
    except Exception as e:
        raise Exception(f"Error processing image: {e}")

# Predict image
def predict_image2(image_tensor):
    with torch.no_grad():
        output = model2(image_tensor)
        probabilities = torch.softmax(output, dim=1)
        probability, predicted = torch.max(probabilities, 1)
        return predicted.item(), probability.item()

# Prepare prediction output
def output_prediction2(filename):
    image_path = os.path.join(APP_ROOT, "images", filename)
    img_tensor = config_image_file2(image_path)
    predicted_idx, probability = predict_image2(img_tensor)
    predicted_label = class_names[predicted_idx]
    return {
        "prediction": predicted_label,
        "probability": f"{probability:.4f}"
    }


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/heart_safe'

# Initialize DB & Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    fullname = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def __init__(self, email, fullname, password):
        self.email = email
        self.fullname = fullname
        self.password = password

# User schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'fullname', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Root route (for health check or landing)
@app.route('/')
def home():
    return jsonify({"message": "Agri-Care Flask backend is up and running."})

# Register user
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    email = data['email']
    fullname = data['fullname']
    password = data['password'].encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt())

    new_user = User(email, fullname, hash_password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

# Login user
@app.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.json
    email = data['email']
    password = data['password'].encode('utf-8')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password, user.password.encode('utf-8')):
        return user_schema.jsonify(user)

    return jsonify({"message": "Invalid credentials"}), 401

# Get all users
@app.route('/api/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

# Predict disease from image
@app.route('/api/predict', methods=['POST'])
def get_disease_prediction():
    target = os.path.join(APP_ROOT, 'images/')
    os.makedirs(target, exist_ok=True)

    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file provided"}), 400

    filename = file.filename
    destination = os.path.join(target, filename)
    file.save(destination)

    result = output_prediction(filename)
    return jsonify(result)

@app.route('/api/predictCinnamon', methods=['POST'])
def get_disease_prediction2():
    target = os.path.join(APP_ROOT, 'images/')
    os.makedirs(target, exist_ok=True)

    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file provided"}), 400

    filename = file.filename
    destination = os.path.join(target, filename)
    file.save(destination)

    try:
        result = output_prediction2(filename)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up: remove the uploaded image
        if os.path.exists(destination):
            os.remove(destination)

# Run app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)
