import { object, string } from 'yup'

export const messageSchema = object({
  text: string().required('The message is needed').min(5).max(500),
})
