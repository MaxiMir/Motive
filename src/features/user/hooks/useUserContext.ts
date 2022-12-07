import { createContext, useContext } from 'react'
import { UserPageDto } from '@dto'

export const UserContext = createContext<UserPageDto | null>(null)

export const useUserContext = () => useContext(UserContext) as UserPageDto
