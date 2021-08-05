import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from '../mock/users'
import meta from '../mock/meta'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { url } = req

  res.status(200).json({
    meta,
    user: USERS.find(({ href }) => url?.replace('/api', '').includes(href)),
  })
}
