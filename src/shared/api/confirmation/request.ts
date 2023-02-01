import { fetcher } from '../fetcher'

export const createConfirmation = (data: FormData): Promise<void> => {
  return fetcher.post('/confirmations', data)
}
