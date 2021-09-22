import { AxiosResponse } from 'axios'
import { Task } from 'dto'
import Axios from 'lib/axios'

export default class TaskService {
  static updateTask(data: Task): Promise<AxiosResponse> {
    return Axios.put(`/tasks/${data.id}`, data)
  }
}
