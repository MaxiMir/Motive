import { useContext } from 'react'
import { SignInContext } from '@entities/signin/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInContext)

  return setOptions
}
