import { Goal, GoalCreation } from 'dto'

export const learnFrench: Goal = {
  id: '314',
  name: 'learn French',
  href: '/better/maximir?goal=314',
  started: '2021-10-17T18:31:42',
  hashtags: ['foreignLanguage', 'knowledge', 'learnFrench', 'immigration', 'recommendation'],
  role: 'MEMBER',
  owner: {
    id: '2',
    fullName: 'Julia Minchenko',
    avatar: '/__temp__/2.png',
    href: '/better/juliaz',
  },
  characteristics: {
    motivation: 3,
    support: 4,
    creativity: 45,
    members: 49,
  },
  day: {
    id: '232',
    date: '2021-11-20T00:00:00.000Z', // 00:00:00.000
    characteristics: {
      motivation: {
        users: ['3', '4', '5'],
        countAll: 3,
      },
      support: {
        users: ['3', '4', '5'],
        countAll: 4,
      },
      creativity: {
        users: ['3', '4', '5'],
        countAll: 45,
      },
      members: {
        users: ['3', '4', '5'],
        countAll: 49,
      },
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
    discussionCount: 4,
    feedbackId: '1',
  },
  dates: [
    { id: '5', date: '2021-09-06T00:00:00.000Z' },
    { id: '3', date: '2021-09-07T00:00:00.000Z' },
    { id: '2', date: '2021-09-08T00:00:00.000Z' },
    { id: '1', date: '2021-09-10T00:00:00.000Z' },
    { id: '3143', date: '2021-11-20T00:00:00.000Z' },
  ],
}

export const becomeSenior: Goal = {
  id: '214',
  name: 'become senior',
  href: '/better/maximir?goal=214',
  started: '2021-09-01T12:31:42',
  hashtags: ['programming', 'knowledge'],
  role: 'OWNER',
  owner: {
    id: '1',
    fullName: 'Maxim Minchenko',
    avatar: '/__temp__/1.png',
    href: '/better/maximir',
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
      motivation: {
        users: ['3', '4', '5'],
        countAll: 5,
      },
      support: {
        users: ['3', '4', '5'],
        countAll: 12,
      },
      creativity: {
        users: ['3', '4', '5'],
        countAll: 32,
      },
      members: {
        users: ['3', '4', '5'],
        countAll: 3,
      },
    },
    tasks: [{ id: '11', name: 'watch video', completed: false, completedByOthers: false }],
    discussionCount: 0,
    feedbackId: '2',
  },
  dates: [
    { id: '1', date: '2021-09-06T00:00:00.000Z' },
    { id: '2', date: '2021-09-07T00:00:00.000Z' },
    { id: '3', date: '2021-09-08T00:00:00.000Z' },
    { id: '4', date: '2021-09-10T00:00:00.000Z' },
    { id: '5', date: '2021-10-06T00:00:00.000Z' },
  ],
}

export const getNewGoal = (goalCreation: GoalCreation): Goal => {
  return {
    id: '413',
    name: goalCreation.name,
    href: '/better/maximir?goal=413',
    started: new Date().toISOString(),
    hashtags: !goalCreation.hashtags
      ? []
      : goalCreation.hashtags
          .trim()
          .split('# ')
          .map((h: string) => h.trim()),
    role: 'OWNER',
    owner: {
      id: '1',
      fullName: 'Maxim Minchenko',
      avatar: '/__temp__/1.png',
      href: '/better/maximir',
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
        motivation: {
          users: [],
          countAll: 0,
        },
        support: {
          users: [],
          countAll: 0,
        },
        creativity: {
          users: [],
          countAll: 0,
        },
        members: {
          users: [],
          countAll: 0,
        },
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
    dates: [{ id: '13', date: new Date().toISOString() }],
  }
}
