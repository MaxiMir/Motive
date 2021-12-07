import { UserDetail } from 'dto'
import { becomeSenior, learnFrench } from './goals'

const ME: UserDetail = {
  name: 'Maxim Minchenko',
  nickname: 'MaxiMir',
  href: '/better/maximir',
  avatar: '/__temp__/1.png',
  characteristics: {
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
  name: 'Julia Minchenko',
  nickname: 'yulifleur',
  href: '/better/yulifleur',
  avatar: '/__temp__/2.png',
  characteristics: {
    motivation: 1,
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
        nickname: 'yulifleur',
        avatar: '/__temp__/2.png',
        href: '/better/juliaz',
      },
    },
  ],
}

const FRIEND: UserDetail = {
  name: 'Alexey Kopeychik',
  nickname: 'NinjaKo',
  href: '/better/kopeychik',
  avatar: '/__temp__/4.png',
  characteristics: {
    motivation: 51.89,
    support: 31.51,
    creativity: 7.13,
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
        name: 'Maxim Minchenko',
        nickname: 'Maximir',
        avatar: '/__temp__/1.png',
        href: '/better/maximir',
      },
    },
  ],
}

const FRIEND1: UserDetail = {
  name: 'Valentina Ulyanova',
  nickname: 'ValUlya',
  href: '/better/ulyanova',
  avatar: '/__temp__/6.png',
  characteristics: {
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
  name: 'Artyom Arzunyan',
  nickname: 'Arty',
  href: '/better/artyom',
  avatar: '/__temp__/3.png',
  characteristics: {
    motivation: 13,
    support: 17.51,
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
