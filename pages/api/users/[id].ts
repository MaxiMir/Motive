import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from 'pages/api/mock/users'
import meta from 'pages/api/mock/meta'
import client from 'pages/api/mock/client'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req
  const href = url?.replace('/api/', '') || ''
  const user = USERS.find((u) => href.includes(u.id))

  if (!user) {
    res.status(404).json({})
  }

  res.status(200).json({
    meta: { ...meta, title: `${user?.name} | Be Better` },
    client,
    user,
  })
}
