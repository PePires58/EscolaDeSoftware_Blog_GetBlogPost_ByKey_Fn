let response;

const dynamodbService = require('./services/dynamodbService');
const s3Service = require('./services/s3Service');
const streamConverterService = require('./services/streamConverterService');

exports.lambdaHandler = async (event, context) => {
    try {
        const queryObject = {
            Hash: event.headers["id"],
            Range: event.queryStringParameters.title
        }

        const resultDb = await dynamodbService.GetBlogPostByKey(queryObject);

        if (!resultDb) {
            response = {
                'statusCode': 204,
                'body': 'nenhum blogpost foi encontrado',
                'isBase64Encoded': false,
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        }
        else {
            const blogContentObjectS3 = await s3Service.GetObjectByKey(resultDb.content_bucket_key.S);

            const blogContentString = await streamConverterService.GetStringFromStream(blogContentObjectS3.Body);

            const resultBody = {
                Id: resultDb.id.S,
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
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify(err),
            'isBase64Encoded': false,
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    }

    return response
};