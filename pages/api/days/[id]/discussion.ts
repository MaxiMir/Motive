import type { NextApiRequest, NextApiResponse } from 'next'
import { TopicWithQuestion } from 'dto'
import users from 'pages/api/mock/users'
import { topics } from 'pages/api/mock/topics'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1500))

  switch (req.method) {
    case 'POST':
      return res.status(201).json({
        id: Date.now().toString(),
        discussionId: Date.now().toString(),
        date: new Date().toISOString(),
        message: req.body.message,
        user: users[4],
        answer: null,
        type: 'question',
        like: {
          active: false,
          count: 0,
        },
      } as TopicWithQuestion)
    default:
      return res.status(200).json(req.query.id === '232' ? topics : [])
  }
}
