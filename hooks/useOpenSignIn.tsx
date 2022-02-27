import { useContext } from 'react'
import { SignInOptions } from 'next-auth/react'
import { ModalSignInContext } from 'context/modalSignInContext'

export default function useOpenSignIn(): (options: SignInOptions) => void {
  const { setOptions } = useContext(ModalSignInContext)

  return setOptions
}
