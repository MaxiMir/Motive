import { createContext, useContext } from 'react'
import { UserPageDto } from 'shared/api'

export const UserContext = createContext<UserPageDto>(null as never)

export function useUserContext() {
  return useContext(UserContext)
}
