import { Stack } from '@mui/material'
import { SignInOptions } from 'next-auth/react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Modal from 'shared/ui/Modal'
import { SOURCE, SourceKey } from './consts'
import { useProviders } from './lib'

const Loader = dynamic(() => import('./loader'))
const Provider = dynamic(() => import('./provider'))

interface SignInModalProps {
  options: SignInOptions
  onClose: () => void
}

export function SignInModal({ options, onClose }: SignInModalProps) {
  const providers = useProviders()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.sign-in' })

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack alignSelf="stretch" gap={2} minHeight={160}>
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
