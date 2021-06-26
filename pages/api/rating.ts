import type { NextApiRequest, NextApiResponse } from 'next'
import { USERS } from './mock/users'
import { meta } from './mock/meta'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    meta,
    motivation: {
      list: [...USERS].sort(
        ({ characteristic: c1 }, { characteristic: c2 }) =>
          c2.motivation - c1.motivation,
      ),
      type: 'motivation',
    },
    creativity: {
      list: [...USERS].sort(
        ({ characteristic: c1 }, { characteristic: c2 }) =>
          c2.motivation - c1.motivation,
      ),
      type: 'creativity',
    },
    support: {
      list: [...USERS].sort(
        ({ characteristic: c1 }, { characteristic: c2 }) =>
          c2.motivation - c1.motivation,
      ),
      type: 'support',
    },
  })
}
