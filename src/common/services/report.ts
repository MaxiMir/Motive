import Axios from 'src/common/lib/axios'
import { CreateReportDto } from 'src/common/dto'

export class ReportService {
  static create(data: CreateReportDto): Promise<void> {
    return Axios.post('/reports', data)
  }
}
