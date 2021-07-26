import { Task } from './Task'

export interface Goal {
  title: string
  hashtags?: string
  tasks: Task[]
}
