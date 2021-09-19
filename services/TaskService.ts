import { AxiosResponse } from 'axios'
import { Task } from 'dto'
import Axios from 'lib/axios'
import { toUrn } from 'helpers/url'

const getBaseUrl = (...urnParts: string[]) => toUrn('tasks', ...urnParts)

export default class TaskService {
  static updateTask(data: Task): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(data.id), data)
  }
}
