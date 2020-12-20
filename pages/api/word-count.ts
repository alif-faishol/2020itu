import { getWordCount } from '@services/DynamoDB';
import { ApiError, createApi, getOneQuery } from '@utils/api';

export default createApi({
  GET: async (req, res) => {
    const word = getOneQuery(req.query.word);

    if (!word) {
      throw new ApiError('word is required!', 400);
    }

    const wordCount = await getWordCount(word);

    res.json({
      data: wordCount.Item && {
        word: wordCount.Item.Message?.S,
        count: parseInt(wordCount.Item.SubmitCount?.N, 10),
      },
    });
  },
});
