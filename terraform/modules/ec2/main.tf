# إنشاء الـ Key Pair
resource "aws_key_pair" "deployer" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

#  Security Group 
resource "aws_security_group" "github_runner_sg" {
  name        = "github-runner-sg"
  description = "Allow SSH and GitHub Outbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # يفضل تحط الـ IP بتاعك هنا لزيادة الأمان
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"] # ضروري جداً عشان الـ Runner يكلم GitHub
  }
}

#  (EC2)
resource "aws_instance" "github_runner" {
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.github_runner_sg.id]

  associate_public_ip_address = true

  #   Setting up the  Runner
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y curl jq libicu-dev
              
              mkdir -p /home/ubuntu/actions-runner && cd /home/ubuntu/actions-runner
              
              # تحميل الـ Runner Agent
              curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
              tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz
              
              # تظبيط الصلاحيات
              sudo chown -R ubuntu:ubuntu /home/ubuntu/actions-runner

              # التسجيل في GitHub (باستخدام الـ Variables)
              sudo -u ubuntu ./config.sh --url ${var.github_repo_url} --token ${var.github_runner_token} --name "AWS-Runner" --unattended --replace

              # تشغيله كـ Service عشان يفضل شغال على طول
              sudo ./svc.sh install
              sudo ./svc.sh start
              EOF

  tags = {
    Name = "GitHubRunnerServer"
  }
}