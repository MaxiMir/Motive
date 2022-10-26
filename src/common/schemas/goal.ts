import { array, object, string } from 'yup'
import { tasksListSchema } from '@schemas/tasks'

export const goalSchema = object({
  name: string().trim().required('The name is needed').min(5, "It's too short.").max(32, "It's so long."),
  hashtags: string().trim().max(255, "It's so long."),
  stages: array().of(
    string().trim().required('The stage name is needed').min(5, "It's too short.").max(32, "It's so long."),
  ),
  tasks: tasksListSchema,
})
