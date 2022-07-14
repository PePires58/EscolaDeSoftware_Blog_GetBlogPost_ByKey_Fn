const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

exports.GetBlogPostByKey = async function (queryObject) {

    const client = new DynamoDBClient({ region: process.env.Region });
    const command = new GetItemCommand({
        TableName: process.env.BlogPostTableName,
        Key: {
            'id': { S: queryObject.Hash },
            'title': { S: queryObject.Range }
        }
    });
    const response = await client.send(command);

    return response.Item;
}