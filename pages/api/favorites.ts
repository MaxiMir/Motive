import type { NextApiRequest, NextApiResponse } from 'next'
import { USERS } from './mock'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    favorites: USERS,
  })
}
