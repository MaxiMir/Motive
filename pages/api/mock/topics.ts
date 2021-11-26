import { TopicType, TopicWithQuestion, TopicWithSupport } from 'dto'
import users from './users'

const question: TopicWithQuestion = {
  id: '124',
  date: '2021-10-06T16:42:00.000Z',
  message: 'What other books do you read?',
  type: TopicType.QUESTION,
  user: users[0],
  like: {
    active: true,
    count: 1344312,
  },
  answer: {
    id: '125',
    date: '2021-10-06T17:00:00.000Z',
    message: 'Typescript for dummies',
    user: users[1],
    like: {
      active: false,
      count: 23,
    },
  },
}

const support: TopicWithSupport = {
  id: '126',
  message: 'You have great plans! Good job!',
  date: new Date().toISOString(),
  type: TopicType.SUPPORT,
  user: users[2],
  like: {
    active: false,
    count: 2,
  },
  answer: null,
}

const question2: TopicWithQuestion = {
  id: '127',
  date: '2021-10-06T17:00:00.000Z',
  message: 'What is the test?',
  type: TopicType.QUESTION,
  user: users[3],
  like: {
    active: false,
    count: 1035,
  },
  answer: {
    id: '125',
    date: '2021-10-06T17:00:00.000Z',
    message:
      'I perform various tests. For example, I use the Kahut app. I read the book Sherlock Holmes and there are tests at the end of the chapter, too.',
    user: users[1],
    like: {
      active: false,
      count: 1455,
    },
  },
}

export const topics = [question, support, question2]
