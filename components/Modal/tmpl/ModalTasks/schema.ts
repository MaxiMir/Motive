import { array, object, string } from 'yup'

export const taskSchema = array().of(
  object({
    name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
    date: string(),
  }),
)

export default object({
  tasks: taskSchema,
})
