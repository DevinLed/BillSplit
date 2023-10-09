const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const aws = require('aws-sdk');
const ddb = new aws.DynamoDB.DocumentClient();

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const params = {
        TableName: 'UsersDynamoDB',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
          '#userId': 'userId',
        },
        ExpressionAttributeValues: {
          ':userId': '123',
        },
      };
      const items = await ddb.query(params).promise();
      
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(items.Items),
      };
    } else if (event.httpMethod === 'POST') {
      const requestBody = JSON.parse(event.body);
      const params = {
        TableName: 'UsersDynamoDB',
        Item: requestBody,
      };
      await ddb.put(params).promise();
      
      return {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ message: 'Data created successfully' }),
      };
    } else if (event.httpMethod === 'PUT') {
      const requestBody = JSON.parse(event.body);
      const params = {
        TableName: 'UsersDynamoDB',
        Key: {
          userId: '123',
        },
        UpdateExpression: 'SET #attrName = :attrValue',
        ExpressionAttributeNames: {
          '#attrName': 'attributeName',
        },
        ExpressionAttributeValues: {
          ':attrValue': requestBody.newValue,
        },
      };
      await ddb.update(params).promise();
      
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ message: 'Data updated successfully' }),
      };
    } else if (event.httpMethod === 'DELETE') {
      const params = {
        TableName: 'UsersDynamoDB',
        Key: {
          userId: '123',
        },
      };
      await ddb.delete(params).promise();
      
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: '',
      };
    } else {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ message: 'Unsupported HTTP method' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
