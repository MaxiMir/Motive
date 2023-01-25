import { Stack } from '@mui/material'
import { SignInOptions } from 'next-auth/react'
import dynamic from 'next/dynamic'
import appleSrc from 'public/images/svg/apple.svg'
import githubSrc from 'public/images/svg/github.svg'
import googleSrc from 'public/images/svg/google.svg'
import metaSrc from 'public/images/svg/meta.svg'
import Modal from '@shared/ui/Modal'
import { useMessages } from './lib/hooks/useMessages'
import { useProviders } from './lib/hooks/useProviders'

const Loader = dynamic(() => import('./ui/Loader'))
const Provider = dynamic(() => import('./ui/provider/Provider'))

const SOURCE = {
  Apple: appleSrc,
  Meta: metaSrc,
  GitHub: githubSrc,
  Google: googleSrc,
}

type SourceKey = keyof typeof SOURCE

interface SignInModalProps {
  options: SignInOptions
  onClose: () => void
}

function SignInModal({ options, onClose }: SignInModalProps) {
  const messages = useMessages()
  const providers = useProviders()

  return (
    <Modal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Stack alignSelf="stretch" spacing={2} minHeight={159}>
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
      </Stack>
    </Modal>
  )
}

export default SignInModal
