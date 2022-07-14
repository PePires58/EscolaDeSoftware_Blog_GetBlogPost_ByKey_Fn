const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

exports.GetBlogPostByKey = async function (queryObject) {

    const client = new DynamoDBClient({ region: process.env.Region });
    const command = new GetItemCommand({
        TableName: process.env.BlogPostTableName,
        Key: {
            'id': { S: queryObject.id },
            'title': { S: queryObject.title }
        }
    });
    const response = await client.send(command);

    return response.Item;
}