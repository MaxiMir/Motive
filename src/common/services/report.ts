import { service } from '@utils/service'
import { CreateReportDto } from '@dto'

export class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return service.post('/reports', data)
  }
}
