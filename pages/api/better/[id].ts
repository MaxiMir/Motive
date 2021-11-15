import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from '../mock/users'
import meta from '../mock/meta'
import client from '../mock/client'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { url } = req
  const user = USERS.find(({ href }) => url?.replace('/api', '').includes(href))

  res.status(200).json({
    meta: { ...meta, title: `${user?.fullName} | Be Better` },
    client,
    user,
  })
}
