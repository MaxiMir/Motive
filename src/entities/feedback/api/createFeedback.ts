import fetcher from '@shared/config/fetcher'
import { FeedbackDto } from '@shared/api/feedback'

export const createFeedback = (data: FormData): Promise<FeedbackDto> => {
  return fetcher.post('/feedback', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
