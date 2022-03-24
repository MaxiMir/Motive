import { object, string } from 'yup'

export default object({
  text: string().required('The message is needed').min(5).max(500),
})
