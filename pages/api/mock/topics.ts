import { TopicWithQuestion, TopicWithSupport } from 'dto'

const question: TopicWithQuestion = {
  id: '124',
  message: 'What other books do you read?',
  type: 'QUESTION',
  userId: '1',
  like: 1344312,
  dislike: 7,
  answer: {
    id: '125',
    message: 'Typescript for dummies',
    userId: '2',
    like: 23,
    dislike: 1,
  },
}

const support: TopicWithSupport = {
  id: '126',
  message: 'You have great plans! Good job!',
  type: 'SUPPORT',
  userId: '3',
  like: 34,
  dislike: 1,
  answer: null,
}

export const topics = [question, support]
