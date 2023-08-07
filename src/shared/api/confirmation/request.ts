import { fetcher } from '../fetcher'

export function createConfirmation(data: FormData): Promise<void> {
  return fetcher.post('/confirmations', data)
}
