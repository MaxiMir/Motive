import { object, string } from 'yup'

const memberSchema = object({
  goalId: string().required(),
  dayId: string().required(),
})

export default memberSchema
