import fetcher from '@lib/fetcher'

export class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return fetcher.patch(`/tasks/${id}/completed`)
  }
}
