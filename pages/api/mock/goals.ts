import { Goal, GoalCreation } from 'dto'

export const learnFrench: Goal = {
  id: 314,
  name: 'learn French',
  started: '2021-10-17T18:31:42',
  hashtags: [
    { id: 15, name: 'foreignLanguage', views: 0 },
    { id: 17, name: 'learnFrench', views: 0 },
    { id: 18, name: 'immigration', views: 1 },
    { id: 21, name: 'recommendation', views: 0 },
  ],
  role: 'MEMBER',
  owner: {
    id: 2,
    nickname: 'juliaz',
    name: 'Julia Minchenko',
    avatar: '/__temp__/2.png',
  },
  characteristic: {
    motivation: 3,
    support: 4,
    creativity: 45,
    members: 49,
  },
  day: {
    id: 232,
    date: '2021-12-03T00:00:00.000Z', // 00:00:00.000
    characteristic: null,
    tasks: [
      {
        id: 1,
        name: 'read 20 pages Harry Potter',
        completed: false,
        completedByOthers: false,
        date: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'watch video "73 Questions"',
        completed: false,
        completedByOthers: true,
        date: new Date(Date.now() + 3600 * 1235).toISOString(),
      },
      { id: 3, name: 'solve 1 the test', completed: false, completedByOthers: false },
    ],
    views: 2311,
    discussionCount: 5,
    feedbackId: 1,
  },
}

export const becomeSenior: Goal = {
  id: 214,
  name: 'become senior',
  started: '2021-09-01T12:31:42',
  hashtags: [
    { id: 3, name: 'programming', views: 1 },
    { id: 4, name: 'knowledge', views: 1 },
  ],
  role: 'OWNER',
  owner: {
    id: 1,
    nickname: 'maximir',
    name: 'Maxim Minchenko',
    avatar: '/__temp__/1.png',
  },
  characteristic: {
    motivation: 5,
    support: 12,
    creativity: 32,
    members: 3,
  },
  day: {
    id: 312,
    date: '2021-10-06T00:00:00.000Z',
    characteristic: null,
    tasks: [{ id: 11, name: 'watch video', completed: false, completedByOthers: false }],
    views: 123,
    discussionCount: 0,
    feedbackId: 2,
  },
}

export const getNewGoal = (goalCreation: GoalCreation): Goal => {
  return {
    id: 413,
    name: goalCreation.name,
    started: new Date().toISOString(),
    hashtags: goalCreation.hashtags.map((name, id) => ({ id, name, views: 0 })),
    role: 'OWNER',
    owner: {
      id: 1,
      nickname: 'maximir',
      name: 'Maxmin Minchenko',
      avatar: '/__temp__/1.png',
    },
    characteristic: {
      motivation: 0,
      support: 0,
      creativity: 0,
      members: 0,
    },
    day: {
      id: 653,
      date: new Date().toISOString(),
      characteristic: null,
      tasks: goalCreation.tasks.map((t, id) => ({
        ...t,
        id,
        completed: false,
        completedByOthers: false,
      })),
      views: 0,
      discussionCount: 0,
      feedbackId: 3,
    },
  }
}
