import type { NextApiRequest, NextApiResponse } from 'next'
import { topics } from '../../mock/topics'
import users from '../../mock/users'

export default async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 3000))

  res.status(200).json({
    success: true,
    data: {
      users: users.map(({ id, fullName, href, avatar }) => ({ id, fullName, href, avatar })),
      topics,
    },
  })
}
