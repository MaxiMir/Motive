import { fetcher } from '../fetcher'

export function createConfirmation(formData: FormData): Promise<void> {
  return fetcher.post('/confirmations', formData)
}
