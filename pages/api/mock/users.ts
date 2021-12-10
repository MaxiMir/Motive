import { UserDetail } from 'dto'
import { becomeSenior, learnFrench } from './goals'

const ME: UserDetail = {
  id: 'maximir',
  name: 'Maxim Minchenko',
  avatar: '/__temp__/1.png',
  characteristic: {
    motivation: 23.13,
    support: 13.56,
    creativity: 14.66,
    awards: 1,
    completed: 8,
    abandoned: 0,
  },
  role: 'OWNER',
  favorite: true,
  views: 113,
  goals: [learnFrench, becomeSenior],
}

const JULIA: UserDetail = {
  id: 'yulifleur',
  name: 'Julia Minchenko',
  avatar: '/__temp__/2.png',
  characteristic: {
    motivation: 1.0,
    support: 5.51,
    creativity: 11.89,
    awards: 0,
    completed: 4,
    abandoned: 0,
  },
  role: 'GUEST',
  favorite: true,
  views: 1,
  goals: [
    {
      ...learnFrench,
      role: 'OWNER',
      owner: {
        name: 'Julia Minchenko',
        id: 'yulifleur',
        avatar: '/__temp__/2.png',
      },
    },
  ],
}

const FRIEND: UserDetail = {
  name: 'Alexey Kopeychik',
  id: 'kopeychik',
  avatar: '/__temp__/4.png',
  characteristic: {
    motivation: 47.63,
    creativity: 27.53,
    support: 37.33,
    awards: 0,
    completed: 4,
    abandoned: 1,
  },
  role: 'GUEST',
  favorite: false,
  views: 1387000,
  goals: [
    {
      ...learnFrench,
      role: 'GUEST',
      owner: {
        id: 'maximir',
        name: 'Maxim Minchenko',
        avatar: '/__temp__/1.png',
      },
    },
  ],
}

const FRIEND1: UserDetail = {
  id: 'valulya',
  name: 'Valentina Ulyanova',
  avatar: '/__temp__/6.png',
  characteristic: {
    motivation: 11.5,
    support: 14.52,
    creativity: 24.69,
    awards: 0,
    completed: 13,
    abandoned: 0,
  },
  role: 'GUEST',
  favorite: false,
  views: 12354,
  goals: [],
}

const FRIEND2: UserDetail = {
  id: 'arty',
  name: 'Artyom Arzunyan',
  avatar: '/__temp__/3.png',
  characteristic: {
    motivation: 13.66,
    support: 17.7,
    creativity: 2.65,
    awards: 0,
    completed: 12,
    abandoned: 0,
  },
  role: 'GUEST',
  favorite: false,
  views: 321,
  goals: [],
}

export default [ME, JULIA, FRIEND, FRIEND1, FRIEND2]
