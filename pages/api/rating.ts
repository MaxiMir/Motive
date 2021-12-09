import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from './mock/users'
import meta from './mock/meta'
import client from './mock/client'

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    meta,
    client,
    motivation: [...USERS].sort((c1, c2) => c2.characteristic.motivation - c1.characteristic.motivation),
    creativity: [...USERS].sort((c1, c2) => c2.characteristic.creativity - c1.characteristic.creativity),
    support: [...USERS].sort((c1, c2) => c2.characteristic.support - c1.characteristic.support),
  })
}
