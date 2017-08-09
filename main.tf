# -------------------------

resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "tilde-submissions"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "submissionID"

  attribute {
    name = "submissionID"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled = false
  }

  tags {
    Name        = "tilde-submissions"
    Environment = "production"
  }
}
