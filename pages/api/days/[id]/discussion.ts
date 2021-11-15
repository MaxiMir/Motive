import type { NextApiRequest, NextApiResponse } from 'next'
import { TopicWithQuestion } from 'dto'
import { topics } from 'pages/api/mock/topics'
import users from 'pages/api/mock/users'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1500))

  switch (req.method) {
    case 'POST':
      res.status(201).json({
        id: '1',
        date: new Date().toISOString(),
        message: req.body.message,
        user: users[4],
        answer: null,
        type: 'QUESTION',
        like: 0,
      } as TopicWithQuestion)
      break
    default:
      res.status(200).json(req.query.id === '232' ? topics : [])
  }
}
