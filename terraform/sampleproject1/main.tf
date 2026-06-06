
# 1. Define the S3 Bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket        = "vishwa-demo-bucket-2026" # MUST be globally unique across all AWS accounts
  force_destroy = true                       # Allows Terraform to delete the bucket even if it has files inside

  tags = {
    Name        = "My Demo Bucket"
    Environment = "Dev"
  }
}

# 2. Block Public Access (Security Best Practice)
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 3. Output the Bucket Name and regional domain name
output "bucket_name" {
  value = aws_s3_bucket.my_bucket.id
}

output "bucket_domain" {
  value = aws_s3_bucket.my_bucket.bucket_regional_domain_name
}