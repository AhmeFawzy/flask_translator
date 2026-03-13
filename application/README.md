# 📁 🌐 Flask Translator App

```markdown
Flask web app for translating text between 100+ languages.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🚀 Quick Start

### Local
```bash
cd application
python -m venv venv && source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python run.py
# Open: http://127.0.0.1:5000
```

### Docker
```bash
docker build -t translator-app:latest .
docker run -d -p 5000:5000 translator-app:latest
curl http://localhost:5000/health
```

---

## 📁 Structure

```
application/
├── app/
│   ├── api/routes.py          # Endpoints
│   ├── services/translator.py # Translation logic
│   ├── static/                # CSS, JS
│   ├── templates/index.html   # UI
│   └── main.py                # Flask app
├── tests/test_translator.py   # Unit tests
├── Dockerfile
├── requirements.txt
└── run.py
```

---

## 🧪 Testing

```bash
# Run tests
pytest tests/ -v

# With coverage
pytest tests/ --cov=app
```

---

## 🔌 API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Web UI |
| `/health` | GET | Health check |
| `/api/translate` | POST | Translate text |

**Example:**
```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","source":"en","target":"fr"}'
```

---

## 🏗️ Architecture Decisions

| Decision | Reason |
|----------|--------|
| **No Database** | Stateless service; no persistence needed |
| **No Nginx** | AWS LoadBalancer + Gunicorn is sufficient |
| **Multi-stage Docker** | Reduces image from 1.2GB → 220MB |
| **No Auth** | Public demo; add JWT for production |

---

## 🛡️ Security

- ✅ Non-root container user
- ✅ Input validation (5000 char limit)
- ✅ No secrets in code
- ✅ Trivy scanning in CI/CD

---

## 🔧 Config

```env
PORT=5000
FLASK_DEBUG=false
WORKERS=2
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 5000 busy | Use `-p 5001:5000` or change `PORT` |
| Translation fails | Check internet (requires API) |
| Tests fail | Verify mock: `app.services.translator.GoogleTranslator` |

---

## 🔗 Related

- CI/CD: `../.github/workflows/README.md`
- Kubernetes: `../kubernetes/README.md`
- Infrastructure: `../terraform/README.md`

---

**Author:** [@AhmeFawzy](https://github.com/AhmeFawzy)
```
