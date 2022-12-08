import fetcher from '@lib/fetcher'
import { CreateReportDto } from '@features/report/dto'

export class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return fetcher.post('/reports', data)
  }
}
