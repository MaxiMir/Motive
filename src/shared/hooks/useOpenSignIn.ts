import { useContext } from 'react'
import { ModalSignInContext } from '@context/modalSignInContext'

const useOpenSignIn = () => {
  const { setOptions } = useContext(ModalSignInContext)

  return setOptions
}

export default useOpenSignIn
