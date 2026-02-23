output "runner_public_ip" {
  description = "The public IP of your GitHub Runner"
  value       = aws_instance.github_runner.public_ip
}