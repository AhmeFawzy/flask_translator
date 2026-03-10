variable "vpc_id" {
  type        = string
  description = "The ID of the VPC"
}

variable "subnet_id" {
  type        = string
  description = "The ID of the Subnet"
}

variable "ami" {
  type        = string
  description = "Ubuntu AMI ID (e.g., ami-0c55b159cbfafe1f0 in us-east-1)"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "key_name" {
  type = string
}

variable "public_key_path" {
  type = string
}

# --- GitHub Runner Config ---
variable "github_repo_url" {
  type        = string
  description = "Full URL of your GitHub repository"
}

variable "github_runner_token" {
  type        = string
  description = "The registration token from GitHub Settings > Actions > Runners"
  sensitive   = true # عشان التوكن ميتطبعش في الـ Terminal
}