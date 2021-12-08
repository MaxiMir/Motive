import { Goal, GoalCreation } from 'dto'

export const learnFrench: Goal = {
  id: '314',
  name: 'learn French',
  started: '2021-10-17T18:31:42',
  hashtags: ['foreignLanguage', 'knowledge', 'learnFrench', 'immigration', 'recommendation'],
  role: 'MEMBER',
  owner: {
    id: 'juliaz',
    name: 'Julia Minchenko',
    avatar: '/__temp__/2.png',
  },
  characteristics: {
    motivation: 3,
    support: 4,
    creativity: 45,
    members: 49,
  },
  day: {
    id: '232',
    date: '2021-12-03T00:00:00.000Z', // 00:00:00.000
    characteristics: {
      motivation: true,
      support: false,
      creativity: true,
      members: false,
    },
    tasks: [
      {
        id: '1',
        name: 'read 20 pages Harry Potter',
        completed: false,
        completedByOthers: false,
        date: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'watch video "73 Questions"',
        completed: false,
        completedByOthers: true,
        date: new Date(Date.now() + 3600 * 1235).toISOString(),
      },
      { id: '3', name: 'solve 1 the test', completed: false, completedByOthers: false },
    ],
    discussionCount: 5,
    feedbackId: '1',
  },
  datesMap: {
    '2021-09-06T00:00:00.000Z': '232',
    '2021-09-07T00:00:00.000Z': '233',
    '2021-09-08T00:00:00.000Z': '234',
    '2021-09-10T00:00:00.000Z': '235',
    '2021-12-03T00:00:00.000Z': '236',
  },
}

export const becomeSenior: Goal = {
  id: '214',
  name: 'become senior',
  started: '2021-09-01T12:31:42',
  hashtags: ['programming', 'knowledge'],
  role: 'OWNER',
  owner: {
    id: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/__temp__/1.png',
  },
  characteristics: {
    motivation: 5,
    support: 12,
    creativity: 32,
    members: 3,
  },
  day: {
    id: '312',
    date: '2021-10-06T00:00:00.000Z',
    characteristics: {
      motivation: true,
      support: false,
      creativity: false,
      members: false,
    },
    tasks: [{ id: '11', name: 'watch video', completed: false, completedByOthers: false }],
    discussionCount: 0,
    feedbackId: '2',
  },
  datesMap: {
    '2021-09-06T00:00:00.000Z': '214',
    '2021-09-07T00:00:00.000Z': '215',
    '2021-09-08T00:00:00.000Z': '216',
    '2021-09-10T00:00:00.000Z': '217',
    '2021-10-06T00:00:00.000Z': '218',
  },
}

export const getNewGoal = (goalCreation: GoalCreation): Goal => {
  return {
    id: '413',
    name: goalCreation.name,
    started: new Date().toISOString(),
    hashtags: !goalCreation.hashtags
      ? []
      : goalCreation.hashtags
          .trim()
          .split('# ')
          .map((h: string) => h.trim()),
    role: 'OWNER',
    owner: {
      id: 'maximir',
      name: 'Maxmin Minchenko',
      avatar: '/__temp__/1.png',
    },
    characteristics: {
      motivation: 0,
      support: 0,
      creativity: 0,
      members: 0,
    },
    day: {
      id: '653',
      date: new Date().toISOString(),
      characteristics: {
        motivation: false,
        support: false,
        creativity: false,
        members: false,
      },
      tasks: goalCreation.tasks.map((t, index) => ({
        ...t,
        id: String(index),
        completed: false,
        completedByOthers: false,
      })),
      discussionCount: 0,
      feedbackId: '3',
    },
    datesMap: {
      [new Date().toISOString()]: '653',
    },
  }
}
