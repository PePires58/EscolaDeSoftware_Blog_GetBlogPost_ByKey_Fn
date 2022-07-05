## Escola de software - Blog - Get BlogPost by key - Lambda Function

This repository contains the lambda function to get a blogpost by key.

The table already exists and the bucket with the blogcontent as well.

Don't forget, to be able to connect with S3 and DynamoDB the function will need two permissions.

- dynamodb:GetItem
- s3:GetObject

The dynamodb:GetItem is a custom manage policy, check it out at the [BlogPost table repository](https://github.com/PePires58/EscolaDeSoftware_Blog_BlogPost_Table){:target="\_blank"}.

Thanks a lot
