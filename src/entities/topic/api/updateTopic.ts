import { UpdateMessageDto } from '@shared/api/topic'
import { fetcher } from '@shared/config'

export const updateTopic = (id: number, data: UpdateMessageDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}
