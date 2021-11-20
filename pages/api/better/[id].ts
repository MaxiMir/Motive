import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from 'pages/api/mock/users'
import meta from 'pages/api/mock/meta'
import client from 'pages/api/mock/client'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { url } = req
  const user = USERS.find(({ href }) => url?.replace('/api', '').includes(href))

  res.status(200).json({
    meta: { ...meta, title: `${user?.fullName} | Be Better` },
    client,
    user,
  })
}
