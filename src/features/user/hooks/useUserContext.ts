import { createContext, useContext } from 'react'
import { UserDetailDto } from '@dto'

const UserContext = createContext<UserDetailDto | null>(null)

const useUserContext = () => {
  return useContext(UserContext) as UserDetailDto
}

export default useUserContext
export { UserContext }
