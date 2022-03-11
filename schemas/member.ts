import { object, string } from 'yup'

export default object({
  goalId: string().required(),
  dayId: string().required(),
})
