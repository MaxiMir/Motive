import type { NextApiRequest, NextApiResponse } from 'next'
import meta from './mock/meta'
import client from './mock/client'

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    meta,
    client,
  })
}
