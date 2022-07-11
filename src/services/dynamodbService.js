const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

exports.GetBlogPostByKey = async function (key) {
    if (!key) {
        throw new Error('key is required');
    }
    else {
        const client = new DynamoDBClient({ region: process.env.Region });
        const command = new GetItemCommand({
            TableName: process.env.BlogPostTableName,
            Key: {
                'title': { S: key }
            }
        });
        const response = await client.send(command);

        return response.Item;
    }
}