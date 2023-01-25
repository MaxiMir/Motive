import { CreateReportDto } from '@shared/api/report'
import { fetcher } from '@shared/config'

export const createReport = (data: CreateReportDto): Promise<void> => {
  return fetcher.post('/reports', data)
}
