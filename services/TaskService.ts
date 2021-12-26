import Axios from 'lib/axios'

export default class TaskService {
  /**
   * /tasks/{id}/completed
   */
  static updateTask(data: { id: number }): Promise<void> {
    return Axios.put(`/tasks/${data.id}/completed`)
  }
}
