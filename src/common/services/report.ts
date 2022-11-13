import { CreateReportDto } from '@dto'
import { service } from '@utils/service'

export class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return service.post('/reports', data)
  }
}
