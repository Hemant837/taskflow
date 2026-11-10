output "instance_id" {
  description = "TaskFlow EC2 instance ID"
  value       = aws_instance.taskflow.id
}

output "public_ip" {
  description = "TaskFlow EC2 public IP"
  value       = aws_instance.taskflow.public_ip
}

output "public_dns" {
  description = "TaskFlow EC2 public DNS"
  value       = aws_instance.taskflow.public_dns
}

output "vpc_id" {
  description = "TaskFlow VPC ID"
  value       = aws_vpc.main.id
}

output "subnet_id" {
  description = "TaskFlow public subnet ID"
  value       = aws_subnet.public.id
}

output "security_group_id" {
  description = "TaskFlow security group ID"
  value       = aws_security_group.taskflow.id
}
