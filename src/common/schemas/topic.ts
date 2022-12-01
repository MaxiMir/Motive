import { object, string } from 'yup'

const topicSchema = object({
  message: string().max(500),
})

export default topicSchema
