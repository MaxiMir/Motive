import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'

export default class TaskService {
  /**
   * /tasks/{id}/completed/
   */
  static updateTask(data: { id: string }): Promise<AxiosResponse> {
    return Axios.put(`/tasks/${data.id}/completed/`)
  }
}
