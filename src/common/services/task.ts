import fetcher from '@utils/fetcher'

export default class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return fetcher.patch(`/tasks/${id}/completed`)
  }
}
