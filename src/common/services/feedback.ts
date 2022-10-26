import { service } from '@utils/service'
import { FeedbackDto } from '@dto'

export class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return service.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
