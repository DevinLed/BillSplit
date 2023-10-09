const aws = require('aws-sdk');

const ddb = new aws.DynamoDB.DocumentClient();
const dynamoDBTableName = 'UsersDynamoDB';

exports.handler = async (event) => {
  const params = {
    TableName: dynamoDBTableName,
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeNames: {
      '#userId': 'userId',
    },
    ExpressionAttributeValues: {
      ':userId': '123',
    },
  };

  try {
    const items = await ddb.query(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify(items.Items),
    };
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
