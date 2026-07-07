from flask import Flask, render_template, request, jsonify
import base64
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    data = request.json

    photo = data["photo"].split(",")[1]
    image = base64.b64decode(photo)

    with open(f"{UPLOAD_FOLDER}/photo.jpg", "wb") as f:
        f.write(image)

    print("Latitude:", data["latitude"])
    print("Longitude:", data["longitude"])

    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
