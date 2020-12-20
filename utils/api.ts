import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import microCors from 'micro-cors';

const DEFAULT_ERR_MESSAGE = 'Oops! Something went wrong.';

const cors = microCors();

export class ApiError extends Error {
  statusCode?: number;
  debugMessage?: string = 'No debug message.';

  /**
   * Construct ApiError Object
   *
   * @param message - The error message
   * @param statusCode - HTTP Status code, disables log when provided
   */
  constructor(message: string, statusCode?: number);
  constructor(opts: { message: string; statusCode?: number; debugMessage?: string });
  constructor(
    opts: { message: string; statusCode?: number; debugMessage?: string } | string,
    statusCode?: number
  ) {
    super(typeof opts === 'string' ? opts : opts.message);
    if (typeof opts !== 'string') {
      if (opts.statusCode) {
        this.statusCode = opts.statusCode;
      }
      if (opts.debugMessage) {
        this.debugMessage = opts.debugMessage;
      }
    } else {
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }
}

export const createApi = (handlers: {
  GET?: NextApiHandler;
  POST?: NextApiHandler;
  PUT?: NextApiHandler;
  DELETE?: NextApiHandler;
}): NextApiHandler =>
  cors(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === 'OPTIONS') {
        res.send('ok!');
        return;
      }
      const handler = handlers[req.method];
      if (!handler) {
        throw new ApiError({ statusCode: 400, message: 'Unsupported Method' });
      }
      await handler(req, res);
    } catch (err: unknown) {
      res.statusCode = 500;
      if (err instanceof Error) {
        if (err instanceof ApiError && err.statusCode) {
          res.statusCode = err.statusCode;
        } else {
          console.error('No debug message', '\n', err.stack);
        }
        res.json({ message: err.message || DEFAULT_ERR_MESSAGE });
      } else {
        console.error('No debug message', '\n', err);
        res.json({ message: DEFAULT_ERR_MESSAGE });
      }
    }
  });

export const getOneQuery = (queryParam: string | string[] | undefined): string | undefined => {
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};
