import { UserDetail } from 'dto'
import { becomeSenior, learnFrench } from './goals'

export const ME: UserDetail = {
  id: '1',
  firstName: 'Maxim',
  lastName: 'Minchenko',
  href: '/better/maximir',
  avatar: '/__temp__/1.png',
  characteristics: {
    motivation: 23.13,
    support: 13.56,
    creativity: 14.66,
    abandoned: 0,
    completed: 8,
  },
  role: 'OWNER',
  favorite: true,
  views: 113,
  goals: [learnFrench, becomeSenior],
}

export const JULIA: UserDetail = {
  id: '2',
  firstName: 'Julia',
  lastName: 'Minchenko',
  href: '/better/juliaz',
  avatar: '/__temp__/2.png',
  characteristics: {
    motivation: 1,
    support: 5.51,
    creativity: 11.89,
    abandoned: 0,
    completed: 4,
  },
  role: 'GUEST',
  favorite: true,
  views: 1,
  goals: [
    {
      ...learnFrench,
      owner: {
        id: '2',
        firstName: 'Julia',
        lastName: 'Minchenko',
        avatar: '/__temp__/2.png',
        href: '/better/juliaz',
      },
      href: '/better/juliaz?goal=314',
    },
  ],
}

export const FRIEND: UserDetail = {
  id: '3',
  firstName: 'Alexey',
  lastName: 'Kopeychik',
  href: '/better/kopeychik',
  avatar: '/__temp__/4.png',
  characteristics: {
    motivation: 51.89,
    support: 31.51,
    creativity: 7.13,
    abandoned: 1,
    completed: 4,
  },
  role: 'GUEST',
  favorite: false,
  views: 1387000,
  goals: [
    {
      ...learnFrench,
      owner: {
        id: '1',
        firstName: 'Maxim',
        lastName: 'Minchenko',
        avatar: '/__temp__/1.png',
        href: '/better/maximir',
      },
      href: '/better/kopeychik?goal=314',
    },
  ],
}

export const FRIEND1: UserDetail = {
  id: '4',
  firstName: 'Valentina',
  lastName: 'Ulyanova',
  href: '/better/ulyanova',
  avatar: '/__temp__/6.png',
  characteristics: {
    motivation: 11.5,
    support: 14.52,
    creativity: 24.69,
    abandoned: 0,
    completed: 13,
  },
  role: 'GUEST',
  favorite: false,
  views: 12354,
  goals: [],
}

export const FRIEND2: UserDetail = {
  id: '5',
  firstName: 'Artyom',
  lastName: 'Arzunyan',
  href: '/better/artyom',
  avatar: '/__temp__/3.png',
  characteristics: {
    motivation: 13,
    support: 17.51,
    creativity: 2.65,
    abandoned: 0,
    completed: 12,
  },
  role: 'GUEST',
  favorite: false,
  views: 321,
  goals: [],
}

export default [ME, JULIA, FRIEND, FRIEND1, FRIEND2]
