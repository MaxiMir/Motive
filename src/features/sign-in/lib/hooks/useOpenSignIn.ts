import { useContext } from 'react'
import { SignInContext } from 'features/sign-in/lib/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInContext)

  return setOptions
}
