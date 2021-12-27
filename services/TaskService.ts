import Axios from 'lib/axios'

export default class TaskService {
  /**
   * /tasks/{id}/completed
   */
  static updateTask(data: { id: number }): Promise<void> {
    const { id } = data

    return Axios.put(`/tasks/${id}/completed`)
  }
}
