import fetcher from '@lib/fetcher'
import { FeedbackDto } from './dto'

export class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return fetcher.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
