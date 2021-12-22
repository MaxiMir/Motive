import { UserDetail } from 'dto'
import { becomeSenior, learnFrench } from './goals'

const ME: UserDetail = {
  id: 1,
  nickname: 'maximir',
  name: 'Maxim Minchenko',
  avatar: '/__temp__/1.png',
  characteristic: {
    motivation: 23.13,
    support: 13.56,
    creativity: 14.66,
    followers: 1,
    completed: 8,
    abandoned: 0,
  },
  favorite: false,
  goals: [learnFrench, becomeSenior],
}

const JULIA: UserDetail = {
  id: 2,
  nickname: 'yulifleur',
  name: 'Julia Minchenko',
  avatar: '/__temp__/2.png',
  characteristic: {
    motivation: 1.0,
    support: 5.51,
    creativity: 11.89,
    followers: 0,
    completed: 4,
    abandoned: 0,
  },
  favorite: false,
  goals: [
    {
      ...learnFrench,
      owner: {
        id: 2,
        nickname: 'yulifleur',
        name: 'Julia Minchenko',
        avatar: '/__temp__/2.png',
      },
    },
  ],
}

const FRIEND: UserDetail = {
  id: 5,
  nickname: 'kopeychik',
  name: 'Alexey Kopeychik',
  avatar: '/__temp__/4.png',
  characteristic: {
    motivation: 47.63,
    creativity: 27.53,
    support: 37.33,
    followers: 0,
    completed: 4,
    abandoned: 1,
  },
  favorite: false,
  goals: [
    {
      ...learnFrench,
      owner: {
        id: 1,
        nickname: 'maximir',
        name: 'Maxim Minchenko',
        avatar: '/__temp__/1.png',
      },
    },
  ],
}

const FRIEND1: UserDetail = {
  id: 3,
  nickname: 'valulya',
  name: 'Valentina Ulyanova',
  avatar: '/__temp__/6.png',
  characteristic: {
    motivation: 11.5,
    support: 14.52,
    creativity: 24.69,
    followers: 0,
    completed: 13,
    abandoned: 0,
  },
  favorite: false,
  goals: [],
}

const FRIEND2: UserDetail = {
  id: 4,
  nickname: 'arty',
  name: 'Artyom Arzunyan',
  avatar: '/__temp__/3.png',
  characteristic: {
    motivation: 13.66,
    support: 17.7,
    creativity: 2.65,
    followers: 0,
    completed: 12,
    abandoned: 0,
  },
  favorite: false,
  goals: [],
}

export default [ME, JULIA, FRIEND, FRIEND1, FRIEND2]
