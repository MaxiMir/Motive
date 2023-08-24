import { array, object } from 'yup'
import { TaskSchema } from 'entities/task'

export const DaySchema = object({
  tasks: array().of(TaskSchema),
})
