import { useContext } from 'react'
import { SignInContext } from '@features/signin/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInContext)

  return setOptions
}
