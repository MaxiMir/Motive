import Axios from 'lib/axios'

export default class TaskService {
  /**
   * /tasks/{id}/completed
   */
  static setCompleted(id: number): Promise<void> {
    return Axios.patch(`/tasks/${id}/completed`)
  }
}
