import fetcher from '@shared/api/fetcher'

export const deleteMember = (id: number): Promise<void> => {
  return fetcher.delete(`/members/${id}`)
}
