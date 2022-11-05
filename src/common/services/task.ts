import { service } from '@utils/service'

export class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return service.patch(`/tasks/${id}/completed`)
  }
}
