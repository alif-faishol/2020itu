import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const WORD_COUNT_MESSAGE_TYPE = '1';
const HOPE_MESSAGE_TYPE = '2';
const WORD_MESSAGE_TYPE = '3';

const generateTimestamp = (): string => `${new Date().toISOString()}-${Math.random().toString(36)}`;

type GetWordsOptions = {
  size?: number;
  dateStart?: Date;
  dateEnd?: Date;
  startKey?: string;
};

export const getWords = async (
  options?: GetWordsOptions
): Promise<PromiseResult<AWS.DynamoDB.ScanOutput, AWS.AWSError>> => {
  const dateStart = options?.dateStart?.toISOString();
  const dateEnd = options?.dateEnd?.toISOString();

  const response = await dynamodb
    .query({
      TableName: '2020itu',
      Limit: options?.size ?? 50,
      ScanIndexForward: false,
      ...(options?.startKey
        ? {
            ExclusiveStartKey: {
              MessageType: {
                S: WORD_MESSAGE_TYPE,
              },
              Message: {
                S: options.startKey,
              },
            },
          }
        : {}),
      ExpressionAttributeValues: {
        ':type': {
          S: WORD_MESSAGE_TYPE,
        },
        ...(dateStart && dateEnd
          ? {
              ':datestart': {
                S: dateStart || '0',
              },
              ':dateend': {
                S: dateEnd || '0',
              },
            }
          : {}),
      },
      KeyConditionExpression: `MessageType = :type${
        dateStart && dateEnd ? ' AND Message BETWEEN :dateend AND :datestart' : ''
      }`,
    })
    .promise();

  return response;
};

export const getWordCount = async (
  word: string
): Promise<PromiseResult<AWS.DynamoDB.GetItemOutput, AWS.AWSError>> => {
  const response = await dynamodb
    .getItem({
      TableName: '2020itu',
      Key: {
        MessageType: {
          S: WORD_COUNT_MESSAGE_TYPE,
        },
        Message: {
          S: word,
        },
      },
    })
    .promise();

  return response;
};

export const submitWord = async (
  word: string
): Promise<PromiseResult<AWS.DynamoDB.PutItemOutput, AWS.AWSError>> => {
  const responses = await Promise.all([
    dynamodb
      .putItem({
        TableName: '2020itu',
        Item: {
          MessageType: {
            S: WORD_MESSAGE_TYPE,
          },
          Message: {
            S: generateTimestamp(),
          },
          Word: {
            S: word,
          },
        },
      })
      .promise(),
    dynamodb
      .updateItem({
        TableName: '2020itu',
        Key: {
          MessageType: {
            S: WORD_COUNT_MESSAGE_TYPE,
          },
          Message: {
            S: word.toLowerCase(),
          },
        },
        ExpressionAttributeValues: {
          ':value': {
            N: '1',
          },
        },
        UpdateExpression: 'ADD SubmitCount :value',
      })
      .promise(),
  ]);

  return responses[0];
};

export const submitHope = async (
  hope: string
): Promise<PromiseResult<AWS.DynamoDB.UpdateItemOutput, AWS.AWSError>> => {
  const response = await dynamodb
    .putItem({
      TableName: '2020itu',
      Item: {
        MessageType: {
          S: HOPE_MESSAGE_TYPE,
        },
        Message: {
          S: generateTimestamp(),
        },
        Hope: {
          S: hope,
        },
      },
    })
    .promise();

  return response;
};
