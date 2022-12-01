import { array, object, string } from 'yup'

const completionSchema = object({
  description: string().max(400),
  photos: array().required().min(1),
})

export default completionSchema
