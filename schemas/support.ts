import { object, string } from 'yup'

export default object({
  text: string().required('message is a required field').min(5).max(500),
})
