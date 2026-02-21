# app/main.py
from flask import Flask, render_template, request, jsonify
from app.services.translator import translate_text
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    
    @app.route("/")
    def home():
        return render_template("index.html")
    
    @app.route("/health")
    def health():
        return jsonify({"status": "healthy", "service": "translator-app", "version": "1.0.0"}), 200
    
    @app.route("/api/translate", methods=["POST"])
    def translate():
        try:
            if not request.is_json:
                return jsonify({"error": "Content-Type must be application/json"}), 400
            
            data = request.get_json()
            text = data.get("text", "").strip()
            source = data.get("source", "auto").lower()
            target = data.get("target", "fr").lower()
            
            if not text:
                return jsonify({"error": "No text provided"}), 400
            
            if len(text) > 5000:
                return jsonify({"error": "Text exceeds 5000 characters"}), 400
            
            logger.info(f"Translating {len(text)} chars: {source} → {target}")
            result = translate_text(text, source, target)
            
            return jsonify(result)
            
        except ValueError as e:
            logger.warning(f"Validation error: {str(e)}")
            return jsonify({"error": str(e)}), 400
        except RuntimeError as e:
            logger.error(f"Translation error: {str(e)}")
            return jsonify({"error": f"Translation failed: {str(e)}"}), 503
        except Exception as e:
            logger.exception("Unexpected error")
            return jsonify({"error": "Internal server error"}), 500
    
    return app