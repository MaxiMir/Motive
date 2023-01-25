import { FeedbackDto } from '@shared/api/feedback'
import { fetcher } from '@shared/config'

export const createFeedback = (data: FormData): Promise<FeedbackDto> => {
  return fetcher.post('/feedback', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
