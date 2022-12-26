import { useContext } from 'react'
import { SignInModalContext } from '@features/signin'

const useOpenSignIn = () => {
  const { setOptions } = useContext(SignInModalContext)

  return setOptions
}

export default useOpenSignIn
