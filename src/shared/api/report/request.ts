import { fetcher } from '../fetcher'
import { CreateReportDto } from './dto'

export function createReport(dto: CreateReportDto): Promise<void> {
  return fetcher.post('/reports', dto)
}
