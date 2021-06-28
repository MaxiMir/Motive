import { Role } from 'dto'

export const useIncrementPageViews = (role: Role) => {
  return () => role === 'OWNER' && console.log('Отправка на бэк')
}
