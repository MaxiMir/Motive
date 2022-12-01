import { object, string } from 'yup'

const feedbackSchema = object().shape({
  text: string()
    .max(500)
    .when('photos', {
      is: (photos: File[]) => !photos.length,
      then: string().required('You need to fill in this field or upload a photo'),
    }),
})

export default feedbackSchema
