import { MessageWithQuestion, MessageWithSupport } from 'dto'

const question: MessageWithQuestion = {
  id: '124',
  message: 'What other books do you read?',
  type: 'Q',
  userId: '1',
  like: 112,
  dislike: 7,
  answer: {
    id: '125',
    message: 'Typescript for dummies?',
    userId: '2',
    like: 23,
    dislike: 1,
  },
}

const support: MessageWithSupport = {
  id: '126',
  message: 'You have great plans! Good job!',
  type: 'S',
  userId: '3',
  like: 34,
  dislike: 1,
}

export const discussion = [question, support]
