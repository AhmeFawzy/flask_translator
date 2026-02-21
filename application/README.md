# 📁 `application/README.md`

```markdown
# 🌐 DevOps Translator Project | 100+ Languages

A production-grade Flask web application that translates text between 100+ languages with automatic language detection. Built for DevOps portfolio demonstration with full CI/CD pipeline, Docker containerization, and Kubernetes deployment.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Kubernetes](https://img.shields.io/badge/K8s-Deployable-blue)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **100+ Languages** | Support for all major world languages |
| 🔍 **Auto-Detect** | Automatically detects source language |
| ⌨️ **Enter to Translate** | Press Enter key to trigger translation |
| 📱 **Responsive UI** | Works on desktop, tablet, and mobile |
| 🔄 **RTL Support** | Proper text direction for Arabic, Hebrew, Persian |
| 📋 **Copy to Clipboard** | One-click copy for input and output |
| ⚡ **On-Demand Translate** | Translate only when you trigger it (button or Enter) |
| 🏥 **Health Endpoint** | `/health` for Kubernetes probes |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- pip
- Docker (optional)

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/flokiboats/flask_translator.git
cd flask_translator/application

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run the application
python run.py

# 6. Open browser
# http://127.0.0.1:5000
```

### Docker

```bash
# Build image
docker build -t translator-app:latest .

# Run container
docker run -d -p 5000:5000 --name translator translator-app:latest

# View logs
docker logs -f translator

# Test health endpoint
curl http://localhost:5000/health

# Stop container
docker stop translator && docker rm translator
```

### Kubernetes (EKS)

```bash
# Apply all manifests
kubectl apply -f ../kubernetes/

# Check deployment
kubectl get pods -n translator
kubectl get svc -n translator

# Access via load balancer
# http://<EXTERNAL-IP>
```

---

## 📁 Project Structure

```
application/
├── app/
│   ├── __init__.py
│   ├── main.py              # Flask app factory
│   ├── services/
│   │   ├── __init__.py
│   │   └── translator.py    # Translation logic
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── app.js
│   └── templates/
│       └── index.html
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_routes.py
│   └── test_translator.py
├── .dockerignore
├── .gitignore
├── Dockerfile
├── requirements.txt
├── run.py
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Application port |
| `FLASK_DEBUG` | `false` | Enable debug mode |
| `FLASK_ENV` | `production` | Environment name |
| `WORKERS` | `2` | Gunicorn worker count |

### .env File Example

```env
PORT=5000
FLASK_DEBUG=false
FLASK_ENV=production
```

---

## 🧪 Testing

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Run specific test
pytest tests/test_translator.py -v
```

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main UI |
| `/health` | GET | Health check |
| `/api/translate` | POST | Translate text |

### Translate API Request

```json
POST /api/translate
Content-Type: application/json

{
  "text": "Hello World",
  "source": "auto",
  "target": "fr"
}
```

### Translate API Response

```json
{
  "translated_text": "Bonjour le Monde",
  "detected_source": "en",
  "source": "en",
  "target": "fr"
}
```

### cURL Examples

```bash
# Health check
curl http://localhost:5000/health

# Translate English to French
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello Ahmed","source":"en","target":"fr"}'

# Auto-detect language
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"مرحبا بك","source":"auto","target":"en"}'
```

---

## 🛡️ Security

- ✅ Non-root container user
- ✅ No secrets in code
- ✅ Input validation (5000 char limit)
- ✅ CORS handled by backend proxy
- ✅ Health endpoint for load balancers
- ✅ Multi-stage Docker build (smaller attack surface)

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| Startup Time | < 5 seconds |
| Translation Latency | 1-3 seconds |
| Concurrent Users | 100+ (with HPA) |
| Memory Usage | ~200MB per pod |
| Docker Image Size | ~220MB |

---

## 🔄 CI/CD Pipeline

```
Git Push → Jenkins → Build → Test → Scan → Push → Deploy → ArgoCD Sync
```

### Pipeline Stages

1. **Checkout** - Pull code from GitHub
2. **Build** - Create Docker image
3. **Test** - Run pytest suite
4. **Scan** - Trivy vulnerability scan
5. **Push** - Push to Docker Hub
6. **Update** - Generate K8s manifests
7. **Deploy** - Apply to EKS cluster

See `../cicd/jenkins/Jenkinsfile-app` for full pipeline.

---

## 🏗️ Architecture Decisions

### Why No Database?

This is a **stateless translation service** — no data needs persistence. Each request is independent and processed in real-time via the deep-translator API.

**For production with user features**, I would add:
- PostgreSQL for user accounts and translation history
- Redis for caching frequent translations

### Why No Nginx?

**AWS LoadBalancer** handles traffic distribution and SSL termination. **Gunicorn** is a production-ready WSGI server. Adding Nginx would introduce unnecessary complexity.

**For microservices with complex routing**, I would add:
- Nginx Ingress Controller for URL routing
- Rate limiting and custom routing rules

### Why Multi-Stage Docker Build?

Multi-stage builds reduce the final image size from ~1.2GB to ~220MB by excluding build tools and temporary files. This makes deployments faster and reduces security vulnerabilities.

---

## 📝 Supported Languages

| Language | Code | Language | Code |
|----------|------|----------|------|
| English | en | French | fr |
| German | de | Arabic | ar |
| Spanish | es | Italian | it |
| Portuguese | pt | Russian | ru |
| Chinese | zh | Japanese | ja |
| Korean | ko | Hindi | hi |
| Turkish | tr | Dutch | nl |
| Polish | pl | Swedish | sv |
| +90 more languages | | | |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Translation fails | Check internet connection, deep-translator requires API access |
| Port 5000 in use | Change PORT in .env or run `docker run -p 5001:5000` |
| Container won't start | Check logs: `docker logs translator` |
| K8s pods not ready | Verify image tag, check `kubectl describe pod -n translator` |
| Auto-translate while typing | Press Enter or click Translate button (auto-translate disabled) |

---

## 📚 Dependencies

```txt
Flask==3.0.0
requests==2.31.0
deep-translator==1.11.4
gunicorn==21.2.0
pytest==7.4.3
pytest-cov==4.1.0
```

---


## 👨‍💻 Author

**Ahmed** - DevOps Engineer

- GitHub: [@flokiboats](https://github.com/flokiboats)
- Docker Hub: [flokiboats/translator-app](https://hub.docker.com/r/flokiboats/translator-app)

---

## 🙏 Acknowledgments

- [deep-translator](https://github.com/nidhaloff/deep-translator) - Translation library
- [Google Translate](https://translate.google.com) - Translation backend
- [Flask](https://flask.palletsprojects.com) - Web framework
```

---

