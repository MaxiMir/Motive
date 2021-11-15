import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1500))

  res.status(200).json(
    req.query?.id !== '232'
      ? {
          text: null,
          photos: null,
          videos: ['https://www.youtube.com/watch?v=Bl5630CeYFs&t=25s', 'https://www.youtube.com/watch?v=5KWEjn839lc'],
        }
      : {
          text: 'It was a very productive day, learned a lot of new expressions. \n Loved the video with 73 questions with Margot Robbie. \n I got the phrase “I am so excited to be here”.',
          photos: [
            // TODO npm install probe-image-size
            { src: '/__temp__/9.jpg', width: 4, height: 3 },
            { src: '/__temp__/10.jpeg', width: 4, height: 3 },
          ],
        },
  )
}
