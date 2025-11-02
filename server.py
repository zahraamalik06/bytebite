from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)  # allows frontend to call API

DATA_FILE = "votes.json"

# GET current votes
@app.route("/votes", methods=["GET"])
def get_votes():
    if not os.path.exists(DATA_FILE):
        return jsonify({})
    with open(DATA_FILE, "r") as f:
        return jsonify(json.load(f))

# POST a new vote
@app.route("/vote", methods=["POST"])
def add_vote():
    data = request.json
    item = data.get("item")
    vote_type = data.get("type")

    if not item or vote_type not in ["up", "down"]:
        return jsonify({"error": "Invalid vote data"}), 400

    votes = {}
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            votes = json.load(f)

    if item not in votes:
        votes[item] = {"up": 0, "down": 0}

    votes[item][vote_type] += 1

    with open(DATA_FILE, "w") as f:
        json.dump(votes, f, indent=2)

    return jsonify({"success": True, "votes": votes[item]})

def load_votes():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            # File is empty or corrupted → reset
            return {}
        



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
