module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  # 1️⃣ ضروري جداً: عشان الـ Nodes تقدر توصل للـ Control Plane
  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  # 2️⃣ ضروري جداً: عشان الـ Pods تاخد صلاحيات AWS (IRSA)
  enable_irsa = true

  # 3️⃣ ضروري جداً: عشان اليوزر اللي شغال يكون أدمن على الكلستر
  enable_cluster_creator_admin_permissions = true

  # 4️⃣ تحسين أمان الشبكة: السماح باتصال الـ Nodes ببعضها
  node_security_group_additional_rules = {
    ingress_self_all = {
      description = "Allow all inbound traffic from nodes"
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "ingress"
      self        = true
    }
  }

  # 5️⃣ إعداد الـ Node Group
  eks_managed_node_groups = {
    workload_nodes = {
      instance_types = [var.node_instance_type]

      min_size     = 1
      max_size     = 3
      desired_size = 2

      # 6️⃣ مهم جداً: سياسات IAM إضافية عشان الـ Nodes تشتغل صح
      iam_role_additional_policies = {
        AmazonEC2ContainerRegistryReadOnly = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
        AmazonEKS_CNI_Policy               = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
      }

      labels = {
        Environment = "dev"
        ManagedBy   = "terraform"
      }
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}