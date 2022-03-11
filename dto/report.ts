export type ReportType = 'goal' | 'message'

export interface CreateReportDto {
  readonly entityId: number
  readonly type: ReportType
  readonly reason: string
}
