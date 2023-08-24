import { array, object, string } from 'yup'
import { TaskSchema } from 'entities/task'

export const GoalSchema = object({
  name: string()
    .trim()
    .required('The name is needed')
    .min(5, "It's too short.")
    .max(32, "It's so long."),
  hashtags: string().trim().max(255, "It's so long."),
  sphere: string().required(),
  stages: array().of(
    object({
      name: string()
        .trim()
        .required('The stage name is needed')
        .min(5, "It's too short.")
        .max(32, "It's so long."),
    }),
  ),
  tasks: array().of(TaskSchema),
})
