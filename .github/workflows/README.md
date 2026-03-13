
---

# `.github/workflows/README.md`

```markdown
# 🔄 CI/CD Workflows

This directory contains the **GitHub Actions pipelines** used to automate
building, testing, scanning, and deploying the application and infrastructure.

---

# 📂 Workflow Files

| File | Description |
|-----|-------------|
| `application.yml` | CI/CD pipeline for the Flask application |
| `infrastructure.yml` | CI/CD pipeline for provisioning AWS infrastructure |

---

# 🚀 Application Pipeline (`application.yml`)

This workflow builds, tests, scans, and publishes the **Flask Translator application**.

## Trigger Conditions

The pipeline runs when:

- Code is pushed to `main` or `testing`
- A pull request targets `main`
- The workflow is triggered manually from the GitHub UI

---

## Pipeline Stages

```

1. Checkout repository
2. Setup Python (3.11)
3. Read application version
4. Install dependencies
5. Run tests (pytest)
6. SonarCloud code quality scan
7. Build Docker image
8. Security scan with Trivy
9. Push image to DockerHub
10. Update Kubernetes deployment manifest
11. Bump application version
12. Commit changes back to repository

```

---

## Required Secrets

The following repository secrets must be configured:

| Secret | Purpose |
|------|------|
| `GH_PAT` | GitHub token used for automated commits |
| `DOCKERHUB_USERNAME` | DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `SONAR_TOKEN` | SonarCloud authentication token |

---

## Environment Variables

Defined inside the workflow:

```

DOCKERHUB_USER=flokiboats
IMAGE_NAME=translator-app
PYTHON_VERSION=3.11
SONAR_ORG=ahmefawzy

```

---

## Pipeline Outputs

After a successful run:

- Docker image is published to **DockerHub**
- Kubernetes deployment manifest is updated
- `VERSION` file is automatically incremented
- Changes are committed back to the repository

---

# 🏗 Infrastructure Pipeline (`infrastructure.yml`)

This workflow provisions the **AWS infrastructure** using Terraform.

---

## Trigger Conditions

Runs when:

- Code changes are pushed to `main` or `testing`
- Triggered manually via GitHub Actions

---

## Pipeline Stages

```

1. Checkout repository
2. Setup Terraform
3. Terraform Init
4. Terraform Plan
5. Terraform Apply

```

---

## Required Secrets

| Secret | Purpose |
|------|------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |

---

## Infrastructure Provisioned

The Terraform pipeline provisions:

- AWS VPC
- Public and private subnets
- EKS Kubernetes cluster
- Terraform state backend (S3)
- CloudWatch monitoring
- SNS notifications

---

# 🔀 Branch Strategy

| Branch | Purpose |
|------|------|
| `main` | Production environment |
| `testing` | Development and testing |

---

# 📊 Checking Pipeline Status

To monitor workflow runs:

```

GitHub Repository → Actions → Select workflow

```

---

# 📚 Related Documentation

- Application: `../application/README.md`
- Kubernetes manifests: `../kubernetes/README.md`
- Infrastructure code: `../terraform/README.md`
```

