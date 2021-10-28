import type { NextApiRequest, NextApiResponse } from 'next'
import { discussion } from '../../mock/discussion'

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    success: true,
    discussion,
  })
}
