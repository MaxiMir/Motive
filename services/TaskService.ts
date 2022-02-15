import Axios from 'lib/axios'

export default class TaskService {
  static setCompleted(id: number): Promise<void> {
    return Axios.patch(`/tasks/${id}/completed`)
  }
}
