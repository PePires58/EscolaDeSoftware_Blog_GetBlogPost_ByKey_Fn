let response;

const dynamodbService = require('./dynamodbService');
const s3Service = require('./s3Service');
const streamConverterService = require('./streamConverterService');

exports.lambdaHandler = async (event, context) => {
    try {
        const resultDb = await dynamodbService.GetBlogPostByKey(event.queryStringParameters.key);

        const blogContentObjectS3 = await s3Service.GetObjectByKey(resultDb.content_bucket_key.S);
        const blogContentString = await streamConverterService.GetStringFromStream(blogContentObjectS3.Body);

        const resultBody = {
            Title: resultDb.title.S,
            Category: resultDb.category.S,
            Image_principal_key: resultDb.image_principal_key.S,
            Post_date: resultDb.post_date.S,
            Resume: resultDb.resume.S,
            BlogContent: blogContentString
        };

        response = {
            'statusCode': 200,
            'body': JSON.stringify(resultBody),
            'isBase64Encoded': false,
            'headers': {}
        }
    } catch (err) {
        response = {
            'statusCode': 500,
            'body': JSON.stringify(err),
            'isBase64Encoded': false,
            'headers': {}
        }
    }

    return response
};
