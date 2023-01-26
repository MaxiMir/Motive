import { FeedbackDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createFeedback = (data: FormData): Promise<FeedbackDto> => {
  return fetcher.post('/feedback', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
