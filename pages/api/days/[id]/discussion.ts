import type { NextApiRequest, NextApiResponse } from 'next'
import { getNewTopic, getTopics } from 'pages/api/mock/topics'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1500))

  switch (req.method) {
    case 'POST':
      return res.status(201).json(getNewTopic(req.body.message, true))
    default:
      return res.status(200).json(getTopics(req.query as Record<string, string>))
  }
}
