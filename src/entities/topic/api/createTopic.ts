import fetcher from '@shared/config/fetcher'
import { CreateMessageDto, TopicDto } from '@shared/api/topic'

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}
