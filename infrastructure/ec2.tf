resource "aws_instance" "taskflow" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.taskflow.id]
  key_name               = "taskflow-key"

  associate_public_ip_address = true

  root_block_device {
    volume_size = 8
    volume_type = "gp3"
  }

  tags = {
    Name        = "taskflow-server-terraform"
    Environment = "dev"
    Project     = "TaskFlow"
  }
}