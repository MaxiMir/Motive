import { object, string } from 'yup'

export const topicSchema = object({
  message: string().max(500),
})
