import Axios from 'lib/axios'
import { ConfirmationDto } from 'dto'
import { Service } from './Service'

export default class ConfirmationService extends Service {
  static create(data: FormData): Promise<void> {
    return Axios.post('/confirmations', data)
  }

  static getByUser(user: number, page: number, take: number): Promise<ConfirmationDto[]> {
    const pagination = ConfirmationService.getPaginationParams(page, take)

    return Axios.get('/confirmations', {
      params: { 'where[user]': user, ...pagination },
    })
  }
}
