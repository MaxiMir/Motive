import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BuiltInProviderType } from 'next-auth/providers'
import { SignInOptions, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import AppModal from 'src/common/ui/AppModal'
import i18n from './i18n'

const Loader = dynamic(() => import('./components/Loader'))
const Provider = dynamic(() => import('./components/Provider'))

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

export interface ModalSignInProps {
  options: SignInOptions
  onClose: () => void
}

export default function ModalSignIn({ options, onClose }: ModalSignInProps) {
  const { locale } = useIntl()
  const [providers, setProviders] = useState<Providers>()
  const { title } = i18n[locale]

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" alignSelf="stretch" gap={2}>
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
      </Box>
    </AppModal>
  )
}
