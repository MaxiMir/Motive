import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from 'pages/api/mock/users'
import meta from 'pages/api/mock/meta'
import client from 'pages/api/mock/client'

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    meta,
    client,
    content: {
      motivation: [...USERS].sort((c1, c2) => c2.characteristic.motivation - c1.characteristic.motivation),
      creativity: [...USERS].sort((c1, c2) => c2.characteristic.creativity - c1.characteristic.creativity),
      support: [...USERS].sort((c1, c2) => c2.characteristic.support - c1.characteristic.support),
    },
  })
}
