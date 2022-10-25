import Axios from 'src/common/lib/axios'
import { ConfirmationDto } from 'src/common/dto'
import { Service, WhereParams } from './Service'

export class ConfirmationService extends Service {
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
