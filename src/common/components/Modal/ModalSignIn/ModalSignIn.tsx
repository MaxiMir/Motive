import dynamic from 'next/dynamic'
import { SignInOptions } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import AppModal from '@ui/AppModal'
import appleSrc from 'public/images/svg/apple.svg'
import metaSrc from 'public/images/svg/meta.svg'
import githubSrc from 'public/images/svg/github.svg'
import googleSrc from 'public/images/svg/google.svg'
import useProviders from './hooks/useProviders'

const SOURCE = {
  Apple: appleSrc,
  Meta: metaSrc,
  GitHub: githubSrc,
  Google: googleSrc,
}
type SourceKey = keyof typeof SOURCE

const Loader = dynamic(() => import('./components/Loader'))
const Provider = dynamic(() => import('./components/Provider'))

interface ModalSignInProps {
  options: SignInOptions
  onClose: () => void
}

function ModalSignIn({ options, onClose }: ModalSignInProps) {
  const { formatMessage } = useIntl()
  const providers = useProviders()
  const title = formatMessage({ id: 'common.sign-in' })

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" alignSelf="stretch" gap={2}>
        {!providers ? (
          <Loader count={4} />
        ) : (
          <>
            {Object.values(providers).map(({ id, name }) => (
              <Provider
                id={id}
                name={name}
                options={options}
                src={SOURCE[name as SourceKey]}
                disabled={id === 'apple'}
                key={id}
              />
            ))}
          </>
        )}
      </Box>
    </AppModal>
  )
}

export default ModalSignIn
