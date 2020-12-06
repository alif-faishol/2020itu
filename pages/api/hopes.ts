import { submitHope } from '@services/DynamoDB';
import { ApiError, createApi } from '@utils/api';

export default createApi({
  POST: async (req, res) => {
    if (!req.body?.hope) {
      throw new ApiError('hope is required!', 400);
    }
    await submitHope(req.body.hope);
    res.json({ message: 'Hope submitted!' });
  },
});
