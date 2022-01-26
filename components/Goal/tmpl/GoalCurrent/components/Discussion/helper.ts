import { TopicDto } from 'dto'
import PageService from 'services/PageService'

export const fetcher = (url: string): Promise<TopicDto[]> => PageService.getURL(url)
