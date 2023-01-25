import { CreateMessageDto, TopicDto } from '@entities/topic/model/dto'
import fetcher from '@shared/api/fetcher'

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}
