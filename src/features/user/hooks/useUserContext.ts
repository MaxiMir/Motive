import { createContext, useContext } from 'react'
import { UserPageDto } from '@dto'

const UserContext = createContext<UserPageDto | null>(null)

const useUserContext = () => {
  return useContext(UserContext) as UserPageDto
}

export default useUserContext
export { UserContext }
