import fetcher from '@shared/api/fetcher'
import { UpdateMessageDto } from '@entities/topic/model/dto'

export const updateTopic = (id: number, data: UpdateMessageDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}
