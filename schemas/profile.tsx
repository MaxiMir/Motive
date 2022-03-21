import { object, string, mixed } from 'yup'

export default object({
  name: string().trim().required('Name needed').min(3, "It's too short.").max(100, "It's so long."),
  nickname: string().trim().required('Nickname needed').min(3, "It's too short.").max(255, "It's so long."),
  avatar: mixed().required(),
})
