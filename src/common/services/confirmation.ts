import { service } from '@utils/service'
import { ConfirmationDto } from '@dto'
import { Service, WhereParams } from './Service'

export class ConfirmationService extends Service {
  static create(data: FormData): Promise<void> {
    return service.post('/confirmations', data)
  }

  static get(where: WhereParams, page: number, take: number): Promise<ConfirmationDto[]> {
    const whereParams = ConfirmationService.getWhereParams(where)
    const paginationParams = ConfirmationService.getPaginationParams(page, take)

    return service.get('/confirmations', {
      params: { ...whereParams, ...paginationParams },
    })
  }
}
