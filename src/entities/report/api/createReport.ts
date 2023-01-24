import fetcher from '@shared/api/fetcher'
import { CreateReportDto } from '@entities/report/model/dto'

export const createReport = (data: CreateReportDto): Promise<void> => {
  return fetcher.post('/reports', data)
}
