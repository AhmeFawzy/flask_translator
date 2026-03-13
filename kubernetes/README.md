# ☸️ Kubernetes Manifests

```markdown

Kubernetes configuration files for deploying Flask Translator on EKS.

---

## 📁 Files

| File | Purpose |
|------|---------|
| `namespace.yaml` | Creates `translator` namespace |
| `configmap.yaml` | App configuration (env vars) |
| `deployment.yaml` | App deployment (replicas, resources) |
| `service.yaml` | LoadBalancer service |
| `hpa.yaml` | Horizontal Pod Autoscaler |

---

## 🚀 Deployment

### 1️⃣ Local (Minikube)

```bash
# Start Minikube
minikube start --memory=4096 --cpus=2

# Apply all manifests
kubectl apply -f .

# Verify
kubectl get pods -n translator
kubectl get svc -n translator

# Access app
minikube service translator-svc -n translator --url

# Stop Minikube
minikube stop
```

### 2️⃣ AWS EKS (Manual)

```bash
# 1. Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name translator-eks

# 2. Apply manifests
kubectl apply -f .

# 3. Verify deployment
kubectl get pods -n translator
kubectl get svc -n translator

# 4. Get LoadBalancer URL
kubectl get svc translator-svc -n translator -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'

# 5. Access app
# http://<LOAD_BALANCER_URL>
```

### 3️⃣ ArgoCD (GitOps)

```bash
# 1. Install ArgoCD (if not installed)
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 2. Access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
# https://localhost:8080

# 3. Login (default password)
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# 4. Create Application in ArgoCD UI or CLI:
# - Repo URL: https://github.com/AhmeFawzy/flask_translator.git
# - Path: kubernetes/
# - Namespace: translator
# - Sync Policy: Automatic

# 5. ArgoCD auto-syncs when manifest changes
```

---

## 🔧 Configuration

### ConfigMap Variables
```yaml
APP_PORT: "5000"
FLASK_ENV: "production"
WORKERS: "2"
```

### Scaling

**Manual:**
```bash
kubectl scale deployment translator-app --replicas=3 -n translator
```

**Automatic (HPA):**
```bash
kubectl get hpa -n translator
# Min: 2, Max: 10, Target CPU: 70%
```

---

## 🧪 Verification

```bash
# Check pods
kubectl get pods -n translator

# Check logs
kubectl logs -f deployment/translator-app -n translator

# Check service
kubectl get svc -n translator

# Check HPA
kubectl get hpa -n translator

# Test health
kubectl exec -it <pod-name> -n translator -- curl localhost:5000/health
```

---

## 🗑️ Cleanup

```bash
# Delete all resources
kubectl delete -f .

# OR delete namespace
kubectl delete namespace translator
```

---

## 🏗️ Architecture

```
AWS Load Balancer (ELB)
        ↓
    Service (NodePort)
        ↓
  Deployment (Pods)
        ↓
  ConfigMap (Config)
        ↓
   HPA (Auto-scale 2-10)
```

---

## 🔗 Related

- Application: `../application/README.md`
- Infrastructure: `../terraform/README.md`
- CI/CD: `../.github/workflows/README.md`

---

**Deployed via:** ArgoCD (GitOps) | **Image:** `flokibaots/translator-app:latest`
```
