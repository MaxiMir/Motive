import { CreateMessageDto, TopicDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}
