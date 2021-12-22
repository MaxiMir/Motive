import { array, object, string } from 'yup'

export const schema = object({
  name: string().trim().required('Goal name needed').min(5, "It's too short.").max(32, "It's so long."),
  hashtags: string().trim().max(255, "It's so long."),
  tasks: array().of(
    object({
      name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
      date: string(),
    }),
  ),
})

export const prepareHashtags = (hashtags: string): string[] =>
  hashtags
    .toLowerCase()
    .split(' ')
    .map((v) => v.replace(/[^a-z\d]/g, ''))
    .filter(Boolean)
