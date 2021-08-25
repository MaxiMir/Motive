import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from './mock/users'
import meta from './mock/meta'
import client from './mock/client'

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    meta,
    client,
    motivation: {
      list: [...USERS].sort((c1, c2) => c2.characteristics.motivation - c1.characteristics.motivation),
      characteristic: 'motivation',
    },
    creativity: {
      list: [...USERS].sort((c1, c2) => c2.characteristics.creativity - c1.characteristics.creativity),
      characteristic: 'creativity',
    },
    support: {
      list: [...USERS].sort((c1, c2) => c2.characteristics.support - c1.characteristics.support),
      characteristic: 'support',
    },
  })
}
