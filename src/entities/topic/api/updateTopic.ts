import fetcher from '@shared/config/fetcher'
import { UpdateMessageDto } from '@shared/api/topic'

export const updateTopic = (id: number, data: UpdateMessageDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}
