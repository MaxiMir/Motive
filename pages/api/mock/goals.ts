import { GoalDto, GoalCreationDto } from 'dto'

export const learnFrench: GoalDto = {
  id: 314,
  name: 'learn French',
  started: '2021-10-17T18:31:42',
  hashtags: ['foreignLanguage', 'french', 'immigration', 'recommendation'],
  calendar: [],
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
  days: [
    {
      id: 232,
      date: '2021-12-03T00:00:00.000Z', // 00:00:00.000
      characteristic: null,
      tasks: [
        {
          id: 1,
          name: 'read 20 pages Harry Potter',
          completed: false,
          completedBy: [],
          date: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'watch video "73 Questions"',
          completed: false,
          completedBy: [],
          date: new Date(Date.now() + 3600 * 1235).toISOString(),
        },
        { id: 3, name: 'solve 1 the test', date: null, completed: false, completedBy: [] },
      ],
      views: 2311,
      topicCount: 5,
      feedback: null,
    },
  ],
}

export const becomeSenior: GoalDto = {
  id: 214,
  name: 'become senior',
  started: '2021-09-01T12:31:42',
  hashtags: ['programming', 'knowledge'],
  calendar: [],
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
  days: [
    {
      id: 312,
      date: '2021-10-06T00:00:00.000Z',
      characteristic: null,
      tasks: [{ id: 11, name: 'watch video', date: null, completed: false, completedBy: [] }],
      views: 123,
      topicCount: 0,
      feedback: null,
    },
  ],
}

export const getNewGoal = (goalCreation: GoalCreationDto): GoalDto => {
  return {
    id: 413,
    name: goalCreation.name,
    started: new Date().toISOString(),
    hashtags: goalCreation.hashtags.split(' '),
    calendar: [],
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
    days: [
      {
        id: 653,
        date: new Date().toISOString(),
        characteristic: null,
        tasks: goalCreation.tasks.map((t, id) => ({
          ...t,
          id,
          date: null,
          completed: false,
          completedBy: [],
        })),
        views: 0,
        topicCount: 0,
        feedback: null,
      },
    ],
  }
}
