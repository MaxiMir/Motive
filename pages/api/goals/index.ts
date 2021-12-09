import type { NextApiRequest, NextApiResponse } from 'next'
import { getNewGoal } from 'pages/api/mock/goals'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { body } = req

  res.status(201).json(getNewGoal(body))
}
