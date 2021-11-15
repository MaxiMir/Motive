import { TopicWithQuestion, TopicWithSupport } from 'dto'
import users from './users'

const question: TopicWithQuestion = {
  id: '124',
  date: '2021-10-06T16:42:00.000Z',
  message: 'What other books do you read?',
  type: 'QUESTION',
  user: users[0],
  like: 1344312,
  answer: {
    id: '125',
    date: '2021-10-06T17:00:00.000Z',
    message: 'Typescript for dummies',
    user: users[1],
    like: 23,
  },
}

const support: TopicWithSupport = {
  id: '126',
  message: 'You have great plans! Good job!',
  date: new Date().toISOString(),
  type: 'SUPPORT',
  user: users[2],
  like: 2566,
  answer: null,
}

const question2: TopicWithQuestion = {
  id: '127',
  date: '2021-10-06T17:00:00.000Z',
  message: 'What is the test?',
  type: 'QUESTION',
  user: users[3],
  like: 1035,
  answer: null,
}

export const topics = [question, support, question2]
