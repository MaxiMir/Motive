import { object, string } from 'yup'

export default object().shape({
  text: string().when('photos', {
    is: (photos: File[]) => !photos.length,
    then: string().min(3).max(256).required('You need to fill in this field or upload a photo'),
  }),
})
