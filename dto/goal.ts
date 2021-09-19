import { GoalCharacteristics } from './characteristic'
import { Role } from './role'

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed' | 'completedByOthers'>>
}

export interface Goal {
  id: string
  name: string
  href: string
  started: string
  hashtags: string[]
  role: Role
  characteristics: GoalCharacteristics
  day: Day
  dates: Array<{ id: string; date: string }>
}

interface Day {
  id: string
  date: string
  tasks: Task[]
  feedback: Feedback
  discussion: number
}

export interface Task {
  id: string
  name: string
  date?: string
  completed: boolean
  completedByOthers: boolean
}

export interface Feedback {
  text: string | null
  photos: Photo[] | null
  videos: string[] | null
}

export interface Photo {
  src: string
  width: number
  height: number
}

// TODO:
// USER -> GOAL -> DAY -> TASK | FEEDBACK | DISCUSSION

// PUT /users/{user-id}/favorites # ИЗБРАННОЕ => { id: string; favorite: boolean }
// PUT /users/{user-id}/views # ПРОСМОТРЫ СТРАНИЦЫ

// POST /goals # СОЗДАНИЕ ЦЕЛИ

// PUT /tasks/${tasks_id}/ # ИЗМЕНЕНИЕ ТАСКИ
