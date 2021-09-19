import { AxiosResponse } from 'axios'
import Axios from 'lib/axios'
import { toUrn } from 'helpers/url'

const getBaseUrl = (...urnParts: string[]) => toUrn('tasks', ...urnParts)

export default class TaskService {
  static setCompletedTask({ id, ...data }: { id: string; isCompleted: boolean }): Promise<AxiosResponse> {
    return Axios.put(getBaseUrl(id), data)
  }
}
