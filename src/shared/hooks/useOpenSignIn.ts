import { useContext } from 'react'
import { ModalSignInContext } from '@features/signin'

const useOpenSignIn = () => {
  const { setOptions } = useContext(ModalSignInContext)

  return setOptions
}

export default useOpenSignIn
