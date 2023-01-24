import { useContext } from 'react'
import { SignInContext } from '@modules/signin/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInContext)

  return setOptions
}
