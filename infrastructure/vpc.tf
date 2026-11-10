resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name        = "taskflow-vpc"
    Environment = "dev"
    Project     = "TaskFlow"
  }
}
