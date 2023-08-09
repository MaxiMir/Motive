import { fetcher } from '../fetcher'
import { CreateReportDto } from './dto'

export function createReport(data: CreateReportDto): Promise<void> {
  return fetcher.post('/reports', data)
}
