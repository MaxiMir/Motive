import type { NextApiRequest, NextApiResponse } from 'next'
import { USERS } from './mock'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    motivation: {
      list: USERS,
      type: 'motivation',
    },
    creativity: {
      list: USERS,
      type: 'creativity',
    },
    support: {
      list: USERS,
      type: 'support',
    },
  })
}
