const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

const tableName = "UsersDynamoDB-dev";

const listItems = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const command = new ScanCommand(params);
    const data = await dynamoDBClient.send(command);
    return data.Items;
  } catch (error) {
    throw error;
  }
};

exports.handler = async (event, context) => {
  try {
    const data = await listItems();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
