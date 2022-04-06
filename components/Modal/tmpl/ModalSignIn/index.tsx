import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BuiltInProviderType } from 'next-auth/providers'
import { SignInOptions, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import useLocale from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

const Loader = dynamic(() => import('./components/Loader'))
const Provider = dynamic(() => import('./components/Provider'))

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

export interface ModalSignInProps {
  tmpl: 'signIn'
  options: SignInOptions
  onClose: () => void
}

export default function ModalSignIn({ options, onClose }: ModalSignInProps): JSX.Element {
  const { locale } = useLocale()
  const [providers, setProviders] = useState<Providers>()
  const { title } = i18n[locale]

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <AppBox flexDirection="column" alignSelf="stretch" gap={2} mt={1} mb={1}>
        {!providers ? (
          <Loader count={3} />
        ) : (
          <>
            {Object.values(providers).map((provider) => (
              <Provider
                provider={provider}
                options={options}
                locale={locale}
                disabled={provider.id === 'apple'}
                key={provider.id}
              />
            ))}
          </>
        )}
      </AppBox>
    </AppModal>
  )
}
