import type { NextApiRequest, NextApiResponse } from 'next'
import { discussion } from '../../mock/discussion'
import users from '../../mock/users'

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    success: true,
    data: {
      users: users.map(({ id, firstName, lastName, href, avatar }) => ({ id, firstName, lastName, href, avatar })),
      discussion,
    },
  })
}
