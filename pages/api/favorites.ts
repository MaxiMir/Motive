import type { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    favorites: [
      {
        id: '1',
        name: 'Maxim Minchenko',
        link: 'maximir',
        avatar: '/__temp__/1.png',
        characteristic: {
          motivation: 99,
          support: 13,
          creativity: 14,
          abandoned: 0,
          completed: 8,
        },
      },
      {
        id: '2',
        name: 'Julia Z',
        link: 'juliaz',
        avatar: '/__temp__/2.png',
        characteristic: {
          motivation: 1,
          support: 5,
          creativity: 11,
          abandoned: 0,
          completed: 4,
        },
      },
      {
        id: '3',
        name: 'Artyom Arzunyan',
        link: 'artyom',
        avatar: '/__temp__/3.png',
        characteristic: {
          motivation: 13,
          support: 17,
          creativity: 2,
          abandoned: 0,
          completed: 12,
        },
      },
    ],
  })
}
