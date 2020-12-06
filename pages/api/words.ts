import { getWords, submitWord } from '@services/DynamoDB';
import { ApiError, createApi } from '@utils/api';

export default createApi({
  GET: async (_req, res) => {
    const words = await getWords();
    res.json(words);
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
