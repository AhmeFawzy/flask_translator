# ---------------------------------------------------------
# Terraform Settings & AWS Provider
# ---------------------------------------------------------
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote backend: S3 + DynamoDB locking
  #backend "s3" {
  #  bucket         = "translator-app-tfstate"
  #  key            = "terraform.tfstate"
  #  region         = "us-east-1"
  #  dynamodb_table = "terraform-locks"
  #  encrypt        = true
  #}
}

provider "aws" {
  region = "us-east-1"
}