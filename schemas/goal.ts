import { object, string } from 'yup'
import taskSchema from 'schemas/tasks'

export default object({
  name: string().trim().required('Goal name needed').min(5, "It's too short.").max(32, "It's so long."),
  hashtags: string().trim().max(255, "It's so long."),
  tasks: taskSchema,
})
