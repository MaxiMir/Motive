import { useContext } from 'react'
import { SignInOptions } from 'next-auth/react'
import { ModalSignInContext } from 'src/common/context/modalSignInContext'

export default function useOpenSignIn(): (options: SignInOptions) => void {
  const { setOptions } = useContext(ModalSignInContext)

  return setOptions
}
