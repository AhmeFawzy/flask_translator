# ---------------------------------------------------------
# Terraform Settings & Version Requirements
# ---------------------------------------------------------
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote Backend for state management and locking
  backend "s3" {
    bucket         = "translator-app-s3-bucket"
    key            = "project/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}

# ---------------------------------------------------------
# AWS Provider Configuration
# ---------------------------------------------------------
provider "aws" {
  region = "us-east-1"
}