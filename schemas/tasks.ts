import { array, date, object, string } from 'yup'

export const tasks = array().of(
  object({
    name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
    date: date(),
  }),
)

export default object({
  tasks,
})
