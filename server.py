from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DATA_FILE = "votes.json"
FRONTEND_DIR = "index.html, style.css, assets/ , chido.woff"  # put index.html, style.css, assets/ here

def load_votes():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_votes(votes):
    with open(DATA_FILE, "w") as f:
        json.dump(votes, f, indent=2)

# Serve front-end
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIR, path)):
        return send_from_directory(FRONTEND_DIR, path)
    else:
        return send_from_directory(FRONTEND_DIR, "index.html")

# API endpoints
@app.route("/votes", methods=["GET"])
def get_votes():
    votes = load_votes()
    return jsonify(votes)

@app.route("/vote", methods=["POST"])
def add_vote():
    data = request.json
    item = data.get("item")
    vote_type = data.get("type")

    if not item or vote_type not in ["up", "down"]:
        return jsonify({"error": "Invalid vote data"}), 400

    votes = load_votes()
    if item not in votes:
        votes[item] = {"up": 0, "down": 0}

    votes[item][vote_type] += 1
    save_votes(votes)

    return jsonify({"success": True, "votes": votes[item]})

if __name__ == "__main__":
    # Use port from Render environment
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
