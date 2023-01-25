import { fetcher } from '@shared/config'

export const createConfirmation = (data: FormData): Promise<void> => {
  return fetcher.post('/confirmations', data)
}
