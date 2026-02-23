module "network" {
  source = "./modules/network"

  vpc_cidr = "10.0.0.0/16"

  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]

  cluster_name = "my-eks-cluster"
}


module "ec2" {
  source = "./modules/ec2"

  ami             = "ami-0b6c6ebed2801a5cb"
  instance_type   = "t2.micro"
  subnet_id       = module.network.public_subnet_ids[0]
  vpc_id          = module.network.vpc_id

  key_name        = "my-keypair"
  public_key_path = "~/.ssh/id_rsa.pub"
}


module "eks" {
  source = "./modules/eks"

  cluster_name       = "my-eks-cluster"
  cluster_version    = "1.30"
  vpc_id             = module.network.vpc_id
  private_subnet_ids = module.network.private_subnet_ids
  node_instance_type = "t3.medium"
}

