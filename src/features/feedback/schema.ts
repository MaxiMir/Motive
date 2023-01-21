import { object, string } from 'yup'

export const feedbackSchema = object().shape({
  text: string()
    .max(1000)
    .when('photos', {
      is: (photos: File[]) => !photos.length,
      then: string().required('You need to fill in this field or upload a photo'),
    }),
})
