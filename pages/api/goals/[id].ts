import type { NextApiRequest, NextApiResponse } from 'next'
import { GoalDto } from 'dto'
import { learnFrench } from 'pages/api/mock/goals'

export default async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1500))

  const goal: GoalDto = {
    ...learnFrench,
    id: 314,
    days: [
      {
        ...learnFrench.days[0],
        id: 532,
        characteristic: {
          motivation: [],
          support: [],
          creativity: [],
        },
        tasks: [
          {
            id: 5,
            name: 'read 30 pages Harry Potter',
            completed: false,
            completedByOthers: false,
            date: new Date().toISOString(),
          },
          {
            id: 6,
            name: 'watch Lord of the Rings #1',
            completed: false,
            completedByOthers: false,
            date: new Date().toISOString(),
          },
          {
            id: 7,
            name: 'Solve 3 tests',
            completed: false,
            completedByOthers: false,
            date: new Date().toISOString(),
          },
        ],
        discussionCount: 0,
        feedbackId: null,
      },
    ],
  }
  res.status(200).json(goal)
}
