import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BuiltInProviderType } from 'next-auth/providers'
import { SignInOptions, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import AppModal from '@ui/AppModal'

const Loader = dynamic(() => import('./components/Loader'))
const Provider = dynamic(() => import('./components/Provider'))

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null

export interface ModalSignInProps {
  options: SignInOptions
  onClose: () => void
}

export default function ModalSignIn({ options, onClose }: ModalSignInProps) {
  const { formatMessage } = useIntl()
  const [providers, setProviders] = useState<Providers>()
  const title = formatMessage({ id: 'common.sign-in' })

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
              <Provider provider={provider} options={options} disabled={provider.id === 'apple'} key={provider.id} />
            ))}
          </>
        )}
      </Box>
    </AppModal>
  )
}
