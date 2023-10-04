const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const operation = event.httpMethod;
  const tableName = "DivvyUsersContacts-div"; // Replace with your DynamoDB table name

  const headers = {
    "Access-Control-Allow-Origin": "*", // Adjust this to match your frontend origin
    "Access-Control-Allow-Credentials": true,
  };

  const params = {
    TableName: tableName,
  };

  if (operation === "GET") {
    // Perform a read operation
    const { id } = event.pathParameters;
    params.Key = { id };

    try {
      const data = await dynamoDB.get(params).promise();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.Item),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error fetching data" }),
      };
    }
  } else if (operation === "POST") {
    // Perform a create operation
    const { userEmail, personName, personEmail, personPhone, personOwing } = JSON.parse(event.body);
    params.Item = {
      id: Date.now().toString(),
      userEmail,
      personName,
      personEmail,
      personPhone,
      personOwing,
    };

    try {
      await dynamoDB.put(params).promise();
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "Contact created successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error creating contact" }),
      };
    }
  } else if (operation === "PUT") {
    // Perform an update operation
    const { id } = event.pathParameters;
    const { userEmail, personName, personEmail, personPhone, personOwing } = JSON.parse(event.body);
    params.Key = { id };
    params.UpdateExpression =
      "SET userEmail = :userEmail, personName = :personName, personEmail = :personEmail, personPhone = :personPhone, personOwing = :personOwing";
    params.ExpressionAttributeValues = {
      ":userEmail": userEmail,
      ":personName": personName,
      ":personEmail": personEmail,
      ":personPhone": personPhone,
      ":personOwing": personOwing,
    };

    try {
      await dynamoDB.update(params).promise();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Contact updated successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error updating contact" }),
      };
    }
  } else if (operation === "DELETE") {
    // Perform a delete operation
    const { id } = event.pathParameters;
    params.Key = { id };

    try {
      await dynamoDB.delete(params).promise();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Contact deleted successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error deleting contact" }),
      };
    }
  } else {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid operation" }),
    };
  }
};
