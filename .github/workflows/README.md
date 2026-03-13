# 📁 First Folder: `.github/workflows/README.md`

```markdown
# 🔄 CI/CD Workflows

GitHub Actions pipelines for automated build, test, and deployment.

---

## 📋 Workflow Files

| File | Purpose |
|------|---------|
| **`application.yml`** | Application CI/CD (build, test, deploy) |
| **`infrastructure.yml`** | Infrastructure CI/CD (provision AWS resources) |

---

## 🚀 `application.yml` - Application Pipeline

### What It Does
Automatically builds, tests, and deploys the Flask Translator app on every code push.

### Triggers
- ✅ Push to `main` or `testing` branch
- ✅ Pull request to `main`
- ✅ Manual trigger via GitHub UI (`workflow_dispatch`)

### Pipeline Stages

```
1. Checkout Code
   ↓
2. Setup Python (3.11)
   ↓
3. Read VERSION file
   ↓
4. Install Dependencies + Run Tests (pytest)
   ↓
5. SonarCloud Scan (code quality)
   ↓
6. Docker Build (create image)
   ↓
7. Trivy Scan (security vulnerabilities)
   ↓
8. Push to DockerHub (flokibaots/translator-app:VERSION)
   ↓
9. Update Kubernetes Manifest (kubernetes/deployment.yaml)
   ↓
10. Bump VERSION (1.0.0 → 1.0.1)
   ↓
11. Commit & Push Changes (back to GitHub)
```

### Manual Trigger
```
1. Go to GitHub repo → Actions tab
2. Click "App CI/CD - Translator"
3. Click "Run workflow"
4. Select branch (main/testing)
5. Click "Run workflow"
```

### Required Secrets
| Secret | Description |
|--------|-------------|
| `GH_PAT` | GitHub Personal Access Token (for auto-commits) |
| `DOCKERHUB_USERNAME` | DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `SONAR_TOKEN` | SonarCloud authentication token |

### Environment Variables
```yaml
DOCKERHUB_USER: flokibaots
IMAGE_NAME: translator-app
SONAR_ORG: ahmefawzy
PYTHON_VERSION: '3.11'
```

### Outputs
- ✅ Docker image pushed to DockerHub
- ✅ Kubernetes manifest updated with new version
- ✅ VERSION file auto-incremented
- ✅ Changes committed back to repository

---

## 🏗️ `infrastructure.yml` - Infrastructure Pipeline

### What It Does
Provisions AWS infrastructure (EKS cluster, VPC, monitoring) using Terraform.

### Triggers
- ✅ Push to `main` or `testing` branch
- ✅ Manual trigger via GitHub UI

### Pipeline Stages

```
1. Checkout Code
   ↓
2. Setup Terraform
   ↓
3. Terraform Init (initialize backend)
   ↓
4. Terraform Plan (preview changes)
   ↓
5. Terraform Apply (provision infrastructure)
```

### Required Secrets
| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |

### What Gets Provisioned
- ✅ VPC with public/private subnets
- ✅ EKS cluster with worker nodes
- ✅ S3 bucket for Terraform state
- ✅ CloudWatch monitoring
- ✅ SNS email notifications

---

## 🔧 Workflow Configuration

### Branch Strategy
| Branch | Purpose |
|--------|---------|
| `main` | Production deployments |
| `testing` | Development/testing deployments |

### Path Filters
Both workflows only run when files in their respective paths change:
- `application.yml`: Triggers on `application/**` changes
- `infrastructure.yml`: Triggers on `terraform/**` changes

### Error Handling
- **SonarCloud**: `continue-on-error: true` (won't block deployment)
- **Trivy**: `continue-on-error: true` (won't block deployment)
- **Tests**: Must pass (blocks deployment if failed)

---

## 📊 Pipeline Status

Check current pipeline status:
```
GitHub Repo → Actions tab → Select workflow → View runs
```

---

**For application code, see `../application/README.md`**  
**For Kubernetes deployment, see `../kubernetes/README.md`**  
**For infrastructure, see `../terraform/README.md`**
```

---

