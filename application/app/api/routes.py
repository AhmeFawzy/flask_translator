from flask import Blueprint, request, jsonify
from app.services.translator import translate_text

api = Blueprint("api", __name__)

@api.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()

    text = data.get("text")
    source = data.get("source_lang")
    target = data.get("target_lang")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    translation = translate_text(text, source, target)

    return jsonify({"translation": translation})
