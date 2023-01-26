import { UpdateMessageDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const updateTopic = (id: number, data: UpdateMessageDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}
