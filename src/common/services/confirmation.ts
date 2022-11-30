import fetcher from '@utils/fetcher'
import { ConfirmationDto } from '@dto'
import Service, { WhereParams } from './Service'

export default class ConfirmationService extends Service {
  static create(data: FormData): Promise<void> {
    return fetcher.post('/confirmations', data)
  }

  static get(where: WhereParams, page: number, take: number): Promise<ConfirmationDto[]> {
    const whereParams = ConfirmationService.getWhereParams(where)
    const paginationParams = ConfirmationService.getPaginationParams(page, take)

    return fetcher.get('/confirmations', {
      params: { ...whereParams, ...paginationParams },
    })
  }
}
