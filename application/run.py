# run.py // comment line for pipeline #2
#Comment line for pipeline.v1
from app.main import create_app
import os

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "true").lower() == "true"
    
    print(f"🚀 Starting Translator App on http://127.0.0.1:{port}")
    print(f"   Debug mode: {debug}")
    print(f"   Languages: 100+ with Auto-Detect")
    
    app.run(host="127.0.0.1", port=port, debug=debug, threaded=True)