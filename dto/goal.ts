export interface Goal {
  id: string
  name: string
  hashtags: string[]
  tasks: Task[]
}

export interface Task {
  id: string
  name: string
  date?: string
  completed: boolean
}

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed'>>
}
