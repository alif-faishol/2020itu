import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const A_WORD_FOR_2020_MESSAGE_TYPE = '1';
const HOPE_FOR_2021_MESSAGE_TYPE = '2';

export const getWords = async (): Promise<PromiseResult<AWS.DynamoDB.ScanOutput, AWS.AWSError>> => {
  const response = await dynamodb
    .query({
      TableName: '2020itu',
      Limit: 500,
      ExpressionAttributeValues: {
        ':type': {
          S: A_WORD_FOR_2020_MESSAGE_TYPE,
        },
      },
      KeyConditionExpression: 'MessageType = :type',
    })
    .promise();

  return response;
};

export const submitWord = async (
  word: string
): Promise<PromiseResult<AWS.DynamoDB.UpdateItemOutput, AWS.AWSError>> => {
  const response = await dynamodb
    .updateItem({
      TableName: '2020itu',
      Key: {
        MessageType: {
          S: A_WORD_FOR_2020_MESSAGE_TYPE,
        },
        Message: {
          S: word,
        },
      },
      ExpressionAttributeValues: {
        ':value': {
          N: '1',
        },
      },
      UpdateExpression: 'ADD SubmitCount :value',
    })
    .promise();

  return response;
};

export const submitHope = async (
  hope: string
): Promise<PromiseResult<AWS.DynamoDB.UpdateItemOutput, AWS.AWSError>> => {
  const response = await dynamodb
    .putItem({
      TableName: '2020itu',
      Item: {
        MessageType: {
          S: HOPE_FOR_2021_MESSAGE_TYPE,
        },
        Message: {
          S: hope,
        },
      },
    })
    .promise();

  return response;
};
