import Axios from 'lib/axios'

export default class TaskService {
  /**
   * /tasks/{id}/completed
   */
  static setCompleted(data: { id: number }): Promise<void> {
    const { id } = data

    return Axios.patch(`/tasks/${id}/completed`)
  }
}
