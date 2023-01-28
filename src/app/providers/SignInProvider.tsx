import { SignInOptions } from 'next-auth/react'
import { ReactNode, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Providers, SignInContext } from 'features/sign-in'

const SignInModal = dynamic(() => import('features/sign-in').then((m) => m.SignInModal))

interface SignInProviderProps {
  providers: Providers
  children: ReactNode
}

function SignInProvider({ providers, children }: SignInProviderProps) {
  const [options, setOptions] = useState<SignInOptions>()
  const value = useMemo(() => ({ providers, setOptions }), [providers])

  const onCloseSignIn = () => setOptions(undefined)

  return (
    <SignInContext.Provider value={value}>
      {children}
      {options && <SignInModal options={options} onClose={onCloseSignIn} />}
    </SignInContext.Provider>
  )
}

export default SignInProvider
