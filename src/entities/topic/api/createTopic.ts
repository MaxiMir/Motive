import { CreateMessageDto, TopicDto } from '@shared/api/topic'
import { fetcher } from '@shared/config'

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}
