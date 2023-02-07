import { array, object, string } from 'yup'

export const ConfirmationSchema = object({
  description: string().max(400),
  photos: array().required().min(1),
})
