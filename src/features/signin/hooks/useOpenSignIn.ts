import { useContext } from 'react'
import { ModalSignInContext } from '@features/signin/context'

export const useOpenSignIn = () => {
  const { setOptions } = useContext(ModalSignInContext)

  return setOptions
}
