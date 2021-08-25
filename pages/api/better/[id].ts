import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from '../mock/users'
import meta from '../mock/meta'
import client from '../mock/client'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { url } = req

  res.status(200).json({
    meta,
    client,
    user: USERS.find(({ href }) => url?.replace('/api', '').includes(href)),
  })
}
