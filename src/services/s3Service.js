const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

exports.GetObjectByKey = async function (objectKey) {
    const client = new S3Client({ region: process.env.Region });
    const command = new GetObjectCommand({
        Bucket: process.env.BlogPostContentBucketName,
        Key: objectKey
    });
    const response = await client.send(command);

    return response;
}
