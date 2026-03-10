# ---------------------------------------------------------
# AWS EKS Cluster Module (v20.0+)
# ---------------------------------------------------------
module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  # Allows the IAM user/role that created the cluster to have Admin access
  enable_cluster_creator_admin_permissions = true

  # Enables the OIDC provider for IRSA (Crucial for GitHub Actions/Pod IAM roles)
  enable_irsa = true

  # Managed Node Groups configuration
  eks_managed_node_groups = {
    # Renamed from jenkins_nodes to workload_nodes
    workload_nodes = {
      instance_types = [var.node_instance_type]

      min_size     = 1
      max_size     = 3
      desired_size = 2

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