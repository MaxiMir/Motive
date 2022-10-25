import Axios from 'src/common/lib/axios'

export class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return Axios.patch(`/tasks/${id}/completed`)
  }
}
