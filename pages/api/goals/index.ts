import type { NextApiRequest, NextApiResponse } from 'next'

import { Task } from 'dto'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { body } = req

  res.status(201).json({
    name: body.name,
    hashtags: !body.hashtags
      ? []
      : body.hashtags
          .trim()
          .split('# ')
          .map((h: string) => h.trim()),
    id: 813,
    href: '/better/maximir?goal=813',
    started: new Date().toISOString(),
    date: new Date().toISOString(),
    role: 'OWNER',
    characteristics: {
      motivation: 0,
      support: 0,
      creativity: 0,
    },
    tasks: body.tasks.map((t: Task) => ({
      ...t,
      completed: false,
      completedByOthers: false,
    })),
    feedback: {
      text: null,
      photos: null,
      videos: null,
    },
    discussion: 0,
  })
}
