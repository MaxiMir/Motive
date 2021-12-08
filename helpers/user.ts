import { USERS } from 'route'

export const getUserHref = (id: string): string => [USERS, id].join('/')
