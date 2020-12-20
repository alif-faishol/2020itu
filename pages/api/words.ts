import { getWords, submitWord } from '@services/DynamoDB';
import { ApiError, createApi, getOneQuery } from '@utils/api';

export default createApi({
  GET: async (req, res) => {
    const size = getOneQuery(req.query.size);
    const nextPageKey = getOneQuery(req.query['next-page-key']);
    let dateStart: Date;
    let dateEnd: Date;
    if (req.query['date-start']) {
      dateStart = new Date(getOneQuery(req.query['date-start']));
    }
    if (req.query['date-end']) {
      dateEnd = new Date(getOneQuery(req.query['date-end']));
    }

    const words = await getWords({
      size: parseInt(size, 10),
      dateStart,
      dateEnd,
      startKey: nextPageKey,
    });

    const response = {
      data: words.Items?.map((item) => {
        return {
          submitted_at: item.Message?.S.slice(0, 24),
          word: item.Word?.S,
        };
      }),
      nextPageKey: words.LastEvaluatedKey?.Message?.S,
    };

    res.json(response);
  },
  POST: async (req, res) => {
    if (typeof req.body?.word !== 'string') {
      throw new ApiError('word is required!', 400);
    }
    if (req.body.word.length > 15) {
      throw new ApiError('word cannot exceed 15 characters!');
    }
    await submitWord(req.body.word);
    res.json({ message: 'Word submitted!' });
  },
});
