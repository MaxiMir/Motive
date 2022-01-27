import { object, string } from 'yup'

export default object({
  message: string().max(500),
})
