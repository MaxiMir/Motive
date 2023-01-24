import fetcher from '@shared/api/fetcher'

export class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return fetcher.patch(`/tasks/${id}/completed`)
  }
}
