import { Stack } from '@mui/material'
import { SignInOptions } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useMessage } from 'shared/lib/hooks'
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
  const title = useMessage('common.sign-in')
  const providers = useProviders()

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack alignSelf="stretch" spacing={2} minHeight={160}>
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
