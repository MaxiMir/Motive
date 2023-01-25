import { useContext } from 'react'
import { SignInContext } from '@entities/signin/lib/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInContext)

  return setOptions
}
