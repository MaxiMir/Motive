import { object, string } from 'yup'

export const memberSchema = object({
  goalId: string().required(),
  dayId: string().required(),
})
