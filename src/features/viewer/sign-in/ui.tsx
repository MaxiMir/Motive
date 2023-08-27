import { Alert, Link as MuiLink, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { SignInOptions } from 'next-auth/react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Route } from 'shared/config'
import Modal from 'shared/ui/Modal'
import { SOURCE, SourceKey } from './consts'
import { useProviders } from './lib'

const Loader = dynamic(() => import('./loader'))
const Provider = dynamic(() => import('./provider'))

interface SignInModalProps {
  options: SignInOptions
  onClose: () => void
}

function SignInModal({ options, onClose }: SignInModalProps) {
  const providers = useProviders()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.sign-in' })
  const alertText = formatMessage({ id: 'component.sign-in.alert' })
  const alertLink = formatMessage({ id: 'component.sign-in.alert.link' })

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack alignSelf="stretch" gap={2} minHeight={335}>
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
        <StyledAlert icon={false} severity="info" variant="outlined">
          {alertText}{' '}
          <MuiLink href={Route.PrivacyPolicy} underline="hover" component={Link} onClick={onClose}>
            {alertLink}
          </MuiLink>
        </StyledAlert>
      </Stack>
    </Modal>
  )
}

const StyledAlert = styled(Alert)({
  textAlign: 'center',
  color: 'white',
  borderColor: 'white',
})

export default SignInModal
