export type ReportType = 'goal' | 'message'

export interface CreateReportDto {
  entityId: number
  type: ReportType
  reason: string
}
