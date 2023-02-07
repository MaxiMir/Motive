import { array, date, object, string } from 'yup'
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from 'entities/task'

export const DaySchema = object({
  tasks: array().of(
    object({
      name: string()
        .trim()
        .required('The task is needed')
        .min(NAME_MIN_LENGTH, "It's too short.")
        .max(NAME_MAX_LENGTH, "It's too long."),
      date: date(),
    }),
  ),
})
