import { fetcher } from '../fetcher'
import { CreateReportDto } from './model'

export const createReport = (data: CreateReportDto): Promise<void> => {
  return fetcher.post('/reports', data)
}
