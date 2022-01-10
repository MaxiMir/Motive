import { object, string } from 'yup'

export default object().shape({
  text: string().when('photos', {
    is: (photos: File[]) => !photos.length,
    then: string().required('You need to fill in this field or upload a photo'),
  }),
})
