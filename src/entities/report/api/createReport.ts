import fetcher from '@shared/config/fetcher'
import { CreateReportDto } from '@shared/api/report'

export const createReport = (data: CreateReportDto): Promise<void> => {
  return fetcher.post('/reports', data)
}
