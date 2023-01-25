import fetcher from '@shared/config/fetcher'

export const deleteMember = (id: number): Promise<void> => {
  return fetcher.delete(`/members/${id}`)
}
