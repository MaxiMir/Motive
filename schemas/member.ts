import { object, string } from 'yup'

export default object({
  id: string().required(),
  start: string().required(),
})
