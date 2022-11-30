import { object, string } from 'yup'

const searchSchema = object({
  q: string(),
})

export default searchSchema
