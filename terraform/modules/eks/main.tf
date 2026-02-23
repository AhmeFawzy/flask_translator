module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_groups = {
    jenkins_nodes = {
      instance_types = [var.node_instance_type]

      min_size     = 1
      max_size     = 3
      desired_size = 2
    }
  }
}

