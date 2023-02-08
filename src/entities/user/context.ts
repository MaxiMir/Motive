import { createContext, useContext } from 'react'
import { UserPageDto } from 'shared/api'

export const UserContext = createContext<UserPageDto>(null as never)

export const useUserContext = () => useContext(UserContext)
