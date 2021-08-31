export const learnFrench = {
  id: '314',
  name: 'learn French',
  href: '/better/maximir?goal=314',
  started: '2021-07-30T18:31:42',
  hashtags: ['foreignLanguage', 'knowledge'],
  role: 'OWNER',
  characteristics: {
    motivation: 1120,
    support: 4,
    creativity: 45,
  },
  tasks: [
    { id: '1', name: 'read 20 pages Harry Potter', completed: true, completedByOthers: false },
    { id: '2', name: 'watch video "73 Questions"', completed: false, completedByOthers: true },
    { id: '3', name: 'solve 1 the test', completed: false, completedByOthers: false },
  ],
  feedback: {
    text: 'It was a very productive day, learned a lot of new expressions. \n Loved the video with 73 questions with Margot Robbie. \n I got the phrase “I am so excited to be here”.',
    photos: [
      // TODO npm install probe-image-size
      { src: '/__temp__/9.jpg', width: 4, height: 3 },
      { src: '/__temp__/10.jpeg', width: 4, height: 3 },
    ],
    videos: ['https://www.youtube.com/watch?v=Bl5630CeYFs&t=25s', 'https://www.youtube.com/watch?v=5KWEjn839lc'],
  },
  discussion: 21,
}

export const becomeSenior = {
  id: '214',
  name: 'become senior',
  href: '/better/maximir?goal=214',
  started: '2021-08-01T12:31:42',
  hashtags: ['programming', 'knowledge'],
  role: 'OWNER',
  characteristics: {
    motivation: 5,
    support: 12,
    creativity: 32,
  },
  tasks: [{ id: '11', name: 'watch video', completed: false }],
  feedback: {
    text: null,
    photos: null,
    videos: null,
  },
  discussion: 0,
}
