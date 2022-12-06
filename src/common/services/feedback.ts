import { FeedbackDto } from '@dto'
import fetcher from '@lib/fetcher'

export default class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return fetcher.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
