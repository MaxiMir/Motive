import { TopicWithQuestion, TopicWithSupport } from 'dto'
import users from './users'

const question: TopicWithQuestion = {
  id: '124',
  message: 'What other books do you read?',
  type: 'QUESTION',
  user: users[0],
  like: 1344312,
  dislike: 7,
  answer: {
    id: '125',
    message: 'Typescript for dummies',
    user: users[1],
    like: 23,
    dislike: 1,
  },
}

const support: TopicWithSupport = {
  id: '126',
  message: 'You have great plans! Good job!',
  type: 'SUPPORT',
  user: users[2],
  like: 34,
  dislike: 1,
  answer: null,
}

const question2: TopicWithQuestion = {
  id: '127',
  message: 'What is the test?',
  type: 'QUESTION',
  user: users[3],
  like: 1035,
  dislike: 0,
  answer: null,
}

export const topics = [question, support, question2]
