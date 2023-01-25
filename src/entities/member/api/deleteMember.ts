import { fetcher } from '@shared/config'

export const deleteMember = (id: number): Promise<void> => {
  return fetcher.delete(`/members/${id}`)
}
