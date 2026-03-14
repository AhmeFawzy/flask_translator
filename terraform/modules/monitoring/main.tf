# ---------------------------------------------------------
# SNS Topic for EKS Alerts
# ---------------------------------------------------------

# 1. Create SNS Topic
resource "aws_sns_topic" "alerts" {
  name = "eks-alerts"
  
  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}

# 2. SNS Topic Policy (Allow CloudWatch to publish messages)
resource "aws_sns_topic_policy" "alerts" {
  arn    = aws_sns_topic.alerts.arn
  policy = data.aws_iam_policy_document.sns_policy.json
}

data "aws_iam_policy_document" "sns_policy" {
  statement {
    effect  = "Allow"
    actions = ["SNS:Publish"]
    
    principals {
      type        = "Service"
      identifiers = ["cloudwatch.amazonaws.com"]
    }
    
    resources = [aws_sns_topic.alerts.arn]
  }
}

# 3. Email Subscription (Gmail)
resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "takofof859@indevgo.com"  # ⚠️ Replace with your actual email
}

# 4. CloudWatch Alarm Example: CPU Utilization > 80%
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"        # 5 minutes
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors EC2 CPU utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  # Replace with the actual EC2 Instance ID of your EKS Node
  dimensions = {
    InstanceId = "i-xxxxxxxxxxxxxxxxx"  # ⚠️ Replace with actual Instance ID
  }
  
  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}

# 5. Output: SNS Topic ARN (for reuse in other alarms)
output "sns_topic_arn" {
  description = "ARN of the SNS topic for alerts"
  value       = aws_sns_topic.alerts.arn
}