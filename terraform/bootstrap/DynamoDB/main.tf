terraform {
  backend "s3" {
    bucket         = "translator-app-s3-bucket"
    key            = "project/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table" # الاسم اللي اخترته في الـ CLI
  }
}