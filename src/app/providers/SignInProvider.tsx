import { SignInOptions } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import dynamic from 'next/dynamic'
import { SignInContext } from 'entities/signin'

const SignInModal = dynamic(() => import('entities/signin').then((m) => m.SignInModal))

interface SignInProviderProps {
  children: ReactNode
}

function SignInProvider({ children }: SignInProviderProps) {
  const [options, setOptions] = useState<SignInOptions>()

  const onCloseSignIn = () => setOptions(undefined)

  return (
    <SignInContext.Provider value={setOptions}>
      {children}
      {options && <SignInModal options={options} onClose={onCloseSignIn} />}
    </SignInContext.Provider>
  )
}

export default SignInProvider
