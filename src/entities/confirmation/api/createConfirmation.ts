import fetcher from '@shared/api/fetcher'

export const createConfirmation = (data: FormData): Promise<void> => {
  return fetcher.post('/confirmations', data)
}
