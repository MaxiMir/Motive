import fetcher from '@lib/fetcher'

export class ConfirmationService {
  static create(data: FormData): Promise<void> {
    return fetcher.post('/confirmations', data)
  }
}
