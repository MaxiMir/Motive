import { array, object, string } from 'yup'

export default object({
  name: string().trim().required('Goal name needed').min(5, "It's too short.").max(32, "It's so long."),
  hashtags: string().trim().max(255, "It's so long."),
  tasks: array().of(
    object({
      name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
      date: string(),
    }),
  ),
})
