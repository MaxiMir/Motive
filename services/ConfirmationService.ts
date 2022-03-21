import Axios from 'lib/axios'
import { ConfirmationDto } from 'dto'
import { Service, WhereParams } from './Service'

export default class ConfirmationService extends Service {
  static create(data: FormData): Promise<void> {
    return Axios.post('/confirmations', data)
  }

  static get(where: WhereParams, page: number, take: number): Promise<ConfirmationDto[]> {
    const whereParams = ConfirmationService.getWhereParams(where)
    const paginationParams = ConfirmationService.getPaginationParams(page, take)

    return Axios.get('/confirmations', {
      params: { ...whereParams, ...paginationParams },
    })
  }
}
