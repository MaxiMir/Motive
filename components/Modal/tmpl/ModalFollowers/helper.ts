import { UserDto } from 'dto'
import PageService from 'services/PageService'

export const fetcher = (url: string): Promise<UserDto[]> => PageService.getURL(url)
