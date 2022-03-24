import { object, string, mixed } from 'yup'

export default object({
  name: string().trim().required('The name is needed').min(3, "It's too short.").max(100, "It's so long."),
  nickname: string().trim().required('A nickname is needed').min(3, "It's too short.").max(255, "It's so long."),
  avatar: mixed().required('An avatar is needed'),
})
