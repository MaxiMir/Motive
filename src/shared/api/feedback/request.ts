import { fetcher } from '../fetcher'
import { FeedbackDto } from './dto'

export const createFeedback = (data: FormData): Promise<FeedbackDto> => {
  return fetcher.post('/feedback', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
