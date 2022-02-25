import Image from 'next/image'
import { Button } from '@material-ui/core'
import { signIn } from 'next-auth/react'
import { Providers } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'

export interface ModalSignInProps {
  tmpl: 'signIn'
  providers: Providers
  onClose: () => void
}

export default function ModalSignIn({ providers, onClose }: ModalSignInProps): JSX.Element {
  return (
    <AppModal title="Sign In" maxWidth="xs" onClose={onClose}>
      <AppBox flexDirection="column" spacing={2} mt={1} alignSelf="stretch">
        {Object.values(providers).map(({ id, name }) => (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
            key={id}
            onClick={() => signIn(id, { callbackUrl: window.location.href })}
          >
            with {name}
          </Button>
        ))}
      </AppBox>
    </AppModal>
  )
}
