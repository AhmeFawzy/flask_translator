## 🏗️ Terraform Infrastructure (Simplified)

```markdown
Minimal IaC for deploying Flask Translator to AWS EKS.

---

## 📁 Structure

```
terraform/
├── main.tf        # All resources (VPC, EKS, S3, SNS)
├── variables.tf   # Input variables
├── outputs.tf     # Exported values
├── providers.tf   # AWS provider + S3 backend
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Terraform >= 1.0
- AWS CLI configured (`aws configure`)
- Permissions: EC2, EKS, S3, DynamoDB, SNS, CloudWatch

### 1️⃣ Initialize Backend
```bash
cd terraform
terraform init
# First run will create S3 bucket + DynamoDB table
```

### 2️⃣ Review Plan
```bash
terraform plan
```

### 3️⃣ Apply Infrastructure
```bash
terraform apply
# Type "yes" to confirm
```

### 4️⃣ Configure kubectl
```bash
# Copy from outputs or run:
aws eks update-kubeconfig --region us-east-1 --name translator-eks
```

### 5️⃣ Verify Cluster
```bash
kubectl get nodes
kubectl get pods -A
```

---

## 💰 Cost Estimate (us-east-1)

| Resource | Type | Monthly Cost |
|----------|------|-------------|
| EKS Control Plane | Managed | ~$73 |
| EKS Nodes | 2x t3.small | ~$30 |
| NAT Gateway | Managed | ~$32 |
| S3 + DynamoDB | State backend | ~$1 |
| SNS + CloudWatch | Monitoring | ~$1 |
| **Total** | | **~$137/month** |

> 💡 **Tip**: Use `terraform destroy` when not in use to save costs.

---

## 🔧 Configuration

### Variables (`variables.tf`)

| Variable | Default | Description |
|----------|---------|-------------|
| `cluster_name` | `translator-eks` | EKS cluster name |
| `node_instance_type` | `t3.small` | Worker node type (min for EKS) |
| `alert_email` | `ahmad.fawzzi@gmail.com` | Email for alerts |

### Change Instance Type (Optional)
```bash
# Edit variables.tf or use -var flag:
terraform apply -var="node_instance_type=t3.medium"
```

---

## 📊 Outputs

After `apply`, you'll see:
- `cluster_name`: EKS cluster name
- `cluster_endpoint`: API server URL
- `vpc_id`: VPC identifier
- `private_subnet_ids`: Subnets for nodes
- `configure_kubectl`: Command to connect kubectl

---

## 🗑️ Cleanup

```bash
# 1. Delete app resources first
kubectl delete -f ../kubernetes/

# 2. Destroy infrastructure
terraform destroy

# 3. Manually empty + delete S3 bucket (if needed)
aws s3 rb s3://translator-app-tfstate --force
```

---

## 🔐 Security Notes

- S3 state bucket: Encrypted at rest + versioned
- DynamoDB: State locking prevents concurrent runs
- SNS email: Requires confirmation (check inbox)
- Security groups: Allow only necessary traffic

---

## 🏗️ Architecture

```
VPC (10.0.0.0/16)
├── Public Subnets (2 AZs)
│   ├── Internet Gateway
│   └── NAT Gateway
│
├── Private Subnets (2 AZs)
│   └── EKS Worker Nodes (t3.small)
│       └── EKS Control Plane (AWS Managed)
│
└── State + Monitoring
    ├── S3 + DynamoDB (Terraform state)
    └── CloudWatch → SNS → Email Alerts
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Bucket already exists" | S3 bucket names are global — pick a unique name |
| "Email subscription pending" | Check `ahmad.fawzzi@gmail.com` and confirm SNS subscription |
| "kubectl connection refused" | Run the `configure_kubectl` output command |
| "Nodes not ready" | Wait 5-10 mins for EKS node group to provision |

---

## 🔗 Related

- Application: `../application/README.md`
- Kubernetes: `../kubernetes/README.md`
- CI/CD: `../.github/workflows/README.md`

---

> ✅ **No EC2 runner needed** — GitHub Actions hosted runners work fine for this project.
```