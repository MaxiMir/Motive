import fetcher from '@shared/api/fetcher'
import { FeedbackDto } from './model/dto'

export class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return fetcher.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
