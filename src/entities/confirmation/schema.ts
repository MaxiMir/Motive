import { array, object, string } from 'yup'

export const confirmationSchema = object({
  description: string().max(400),
  photos: array().required().min(1),
})
