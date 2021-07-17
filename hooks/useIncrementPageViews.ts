import { Role } from 'dto'

export default function useIncrementPageViews(role: Role): () => void {
  return () => {
    role === 'OWNER' && console.log('Отправка на бэк')
  }
}
