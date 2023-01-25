import fetcher from '@shared/api/fetcher'
import { CreateMessageDto, TopicDto } from '@entities/topic/model/dto'

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}
