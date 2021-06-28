import type { NextApiRequest, NextApiResponse } from 'next'
import { meta } from './mock/meta'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    meta,
  })
}
