import { CreateReportDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createReport = (data: CreateReportDto): Promise<void> => {
  return fetcher.post('/reports', data)
}
