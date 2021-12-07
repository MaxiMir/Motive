import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from 'pages/api/mock/users'
import meta from 'pages/api/mock/meta'
import client from 'pages/api/mock/client'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { url } = req
  const href = url?.replace('/api', '') || ''
  const user = USERS.find((u) => href.includes(u.href))

  res.status(200).json({
    meta: { ...meta, title: `${user?.nickname} | Be Better` },
    client,
    user,
    href,
  })
}
