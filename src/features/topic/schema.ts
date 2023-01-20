import { object, string } from 'yup'

export const topicSchema = object({
  text: string().required('The message is needed').min(5).max(1000),
})
