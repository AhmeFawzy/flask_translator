# 🌐 Translator App - 100+ Languages with Auto-Detect

A production-grade Flask web application that translates text between 100+ languages with automatic language detection, built for DevOps portfolio demonstration.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Kubernetes](https://img.shields.io/badge/K8s-Deployable-blue)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **100+ Languages** | Support for all major world languages |
| 🔍 **Auto-Detect** | Automatically detects source language |
| ⌨️ **Enter to Translate** | Press Enter key to trigger translation |
| 📱 **Responsive UI** | Works on desktop, tablet, and mobile |
| 🔄 **RTL Support** | Proper text direction for Arabic, Hebrew, Persian |
| 📋 **Copy to Clipboard** | One-click copy for input and output |
| ⚡ **Auto-Translate** | Translates as you type (800ms debounce) |
| 🏥 **Health Endpoint** | `/health` for Kubernetes probes |

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/yourusername/flask_eng_fr_translator.git
cd flask_eng_fr_translator/application

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate     # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the application
python run.py

# 5. Open browser
# http://127.0.0.1:5000