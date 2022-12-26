import { useContext } from 'react'
import { SignInModalContext } from '@features/signin/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInModalContext)

  return setOptions
}
