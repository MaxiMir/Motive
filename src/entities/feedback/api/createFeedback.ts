import fetcher from '@shared/api/fetcher'
import { FeedbackDto } from '@entities/feedback/model/dto'

export const createFeedback = (data: FormData): Promise<FeedbackDto> => {
  return fetcher.post('/feedback', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
