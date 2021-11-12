import type { NextApiRequest, NextApiResponse } from 'next'
import { topics } from '../../mock/topics'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 3000))

  res.status(200).json({
    success: true,
    data: req.query.id === '232' ? topics : [],
  })
}
