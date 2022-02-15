import Axios from 'lib/axios'
import { CreateReportDto } from 'dto'

export class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return Axios.post('/reports', data)
  }
}
