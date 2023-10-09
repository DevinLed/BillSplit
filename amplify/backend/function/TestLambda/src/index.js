const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        let response = {};
        const { httpMethod, pathParameters, body } = event;

        switch (httpMethod) {
            case 'GET':
                response = await readItem(pathParameters.id);
                break;
            case 'POST':
                response = await createItem(JSON.parse(body));
                break;
            case 'PUT':
                response = await updateItem(pathParameters.id, JSON.parse(body));
                break;
            case 'DELETE':
                response = await deleteItem(pathParameters.id);
                break;
            default:
                response = createResponse(405, 'Method Not Allowed');
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        return createResponse(500, 'Internal Server Error');
    }
};

const readItem = async (id) => {
    const params = {
        TableName: 'UsersDynamoDB-dev',
        Key: {
            id: id
        }
    };

    const data = await dynamoDB.get(params).promise();
    return createResponse(200, data.Item);
};

const createItem = async (item) => {
    const params = {
        TableName: 'UsersDynamoDB-dev',
        Item: item
    };

    await dynamoDB.put(params).promise();
    return createResponse(201, 'Created');
};

const updateItem = async (id, item) => {
    const params = {
        TableName: 'UsersDynamoDB-dev',
        Key: {
            id: id
        },
        UpdateExpression: 'set #attrName = :attrValue',
        ExpressionAttributeNames: {
            '#attrName': 'SomeAttribute'
        },
        ExpressionAttributeValues: {
            ':attrValue': item.SomeAttribute
        },
        ReturnValues: 'UPDATED_NEW'
    };

    const data = await dynamoDB.update(params).promise();
    return createResponse(200, data.Attributes);
};

const deleteItem = async (id) => {
    const params = {
        TableName: 'UsersDynamoDB-dev',
        Key: {
            id: id
        }
    };

    await dynamoDB.delete(params).promise();
    return createResponse(204, 'No Content');
};

const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
};
