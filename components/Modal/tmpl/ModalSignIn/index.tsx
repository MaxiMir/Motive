import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BuiltInProviderType } from 'next-auth/providers'
import { SignInOptions, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'

const Loader = dynamic(() => import('./components/Loader'))
const Provider = dynamic(() => import('./components/Provider'))

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

export interface ModalSignInProps {
  tmpl: 'signIn'
  options: SignInOptions
  onClose: () => void
}

export default function ModalSignIn({ options, onClose }: ModalSignInProps): JSX.Element {
  const [providers, setProviders] = useState<Providers>()

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return (
    <AppModal title="Sign In" maxWidth="xs" onClose={onClose}>
      <AppBox flexDirection="column" alignSelf="stretch" spacing={2} mt={1} mb={1}>
        {!providers ? (
          <Loader count={3} />
        ) : (
          <>
            {Object.values(providers).map((provider) => (
              <Provider provider={provider} options={options} disabled={provider.id === 'apple'} key={provider.id} />
            ))}
          </>
        )}
      </AppBox>
    </AppModal>
  )
}
