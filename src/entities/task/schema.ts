import { date, object, string } from 'yup'

export const TaskSchema = object({
  name: string()
    .trim()
    .required('The task is needed')
    .min(5, "It's too short.")
    .max(255, "It's too long."),
  date: date().nullable(),
  priority: string().nullable(),
})
