import { object, string } from 'yup'

const messageSchema = object({
  text: string().required('The message is needed').min(5).max(500),
})

export default messageSchema
