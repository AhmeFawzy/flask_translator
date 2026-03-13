# ---------------------------------------------------------
# Input Variables
# ---------------------------------------------------------

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "translator-eks"
}

variable "cluster_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.30"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "Public subnet CIDRs"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "Private subnet CIDRs"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "node_instance_type" {
  description = "EKS worker node type (minimum: t3.small)"
  type        = string
  default     = "t3.small"  # ✅ Cheapest option for EKS
}

variable "alert_email" {
  description = "Email for CloudWatch/SNS alerts"
  type        = string
  default     = "ahmad.fawzzi@gmail.com"
}