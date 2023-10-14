const { DynamoDBClient, ScanCommand, PutItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
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

const createItem = async (itemData) => {
  const params = {
    TableName: tableName,
    Item: itemData,
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (itemId) => {
  const params = {
    TableName: tableName,
    Key: {
      
    },
  };

  try {
    const command = new DeleteItemCommand(params);
    await dynamoDBClient.send(command);
  } catch (error) {
    throw error;
  }
};

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === "OPTIONS") {
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, DELETE", 
            "Access-Control-Allow-Headers": "Content-Type", 
          },
          body: "This didn't work", 
        };
      }
    if (event.httpMethod === "GET") {
      const data = await listItems();
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      };
    } else if (event.httpMethod === "POST") {
      const itemData = JSON.parse(event.body);
      await createItem(itemData);
      return {
        statusCode: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Item created successfully" }),
      };
    } else if (event.httpMethod === "DELETE") {
      const itemId = event.pathParameters.itemId;
      await deleteItem(itemId);
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: "",
      };
    } else {
      return {
        statusCode: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }
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
