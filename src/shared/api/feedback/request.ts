import { fetcher } from '../fetcher'
import { FeedbackDto } from './dto'

export function createFeedback(formData: FormData): Promise<FeedbackDto> {
  return fetcher.post('/feedback', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
