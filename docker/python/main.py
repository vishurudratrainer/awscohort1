from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Hello from Flask inside Docker!",
        "framework": "Flask",
        "language": "Python"
    })

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    # It is crucial to set host to '0.0.0.0' so the app listens 
    # to requests from outside the Docker container.
    app.run(host='0.0.0.0', port=8000)