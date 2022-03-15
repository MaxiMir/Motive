import Axios from 'lib/axios'

export default class TaskService {
  static updateCompleted(id: number): Promise<void> {
    return Axios.patch(`/tasks/${id}/completed`)
  }
}
