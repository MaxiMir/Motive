import type { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json([
    { id: '3143', date: '2021-08-02T00:00:00.000Z' },
    { id: '5', date: '2021-08-06T00:00:00.000Z' },
    { id: '3', date: '2021-08-07T00:00:00.000Z' },
    { id: '2', date: '2021-08-08T00:00:00.000Z' },
    { id: '1', date: '2021-08-10T00:00:00.000Z' },
  ])
}
