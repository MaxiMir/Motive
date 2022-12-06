import { CreateReportDto } from '@dto'
import fetcher from '@lib/fetcher'

export default class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return fetcher.post('/reports', data)
  }
}
