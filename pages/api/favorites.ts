import type { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    favorites: [
      {
        id: '1',
        name: 'Maxim Minchenko',
        link: 'localhost:3000/maximir',
        avatar: '/__temp__/1.png',
        characteristic: {
          motivation: 23,
          support: 13,
          creativity: 14,
          abandoned: 0,
          completed: 8,
        },
      },
      {
        id: '2',
        name: 'Julia Z',
        link: 'localhost:3000/juliaz',
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
        name: 'Alexey Kopeychik',
        link: 'localhost:3000/kopeychik',
        avatar: '/__temp__/4.png',
        characteristic: {
          motivation: 51,
          support: 31,
          creativity: 7,
          abandoned: 0,
          completed: 4,
        },
      },
      {
        id: '4',
        name: 'Valentina Ulyanova',
        link: 'localhost:3000/ulyanova',
        avatar: '/__temp__/6.png',
        characteristic: {
          motivation: 11,
          support: 14,
          creativity: 24,
          abandoned: 0,
          completed: 13,
        },
      },
      {
        id: '5',
        name: 'Artyom Arzunyan',
        link: 'localhost:3000/artyom',
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
