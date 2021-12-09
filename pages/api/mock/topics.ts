import { Discussion, Topic, TopicType } from 'dto'
import users from './users'

const question: Topic = {
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

const support: Topic = {
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

const question2: Topic = {
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

export const getTopics = (query: Record<string, string>): Discussion => {
  if (query.id === '232') {
    return {
      content: topics,
      last: false,
    }
  }

  return {
    content: [],
    last: true,
  }
}

export const getNewTopic = (message: string, isQuestion: boolean): Topic => ({
  id: Date.now().toString(),
  date: new Date().toISOString(),
  message,
  user: users[4],
  answer: null,
  type: isQuestion ? TopicType.QUESTION : TopicType.SUPPORT,
  like: {
    active: false,
    count: 0,
  },
})
