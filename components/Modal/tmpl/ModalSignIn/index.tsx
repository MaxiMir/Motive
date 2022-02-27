import Image from 'next/image'
import { Button } from '@material-ui/core'
import { SignInOptions, signIn } from 'next-auth/react'
import { Provider } from 'next-auth/providers'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'

export interface ModalSignInProps {
  tmpl: 'signIn'
  options: SignInOptions
  providers: Record<string, Provider>
  onClose: () => void
}

export default function ModalSignIn({ options, providers, onClose }: ModalSignInProps): JSX.Element {
  return (
    <AppModal title="Sign In" maxWidth="xs" onClose={onClose}>
      <AppBox flexDirection="column" alignSelf="stretch" spacing={2} mt={1} mb={1}>
        {Object.values(providers).map(({ id, name }) => (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
            key={id}
            onClick={() => signIn(id, options)}
          >
            with {name}
          </Button>
        ))}
      </AppBox>
    </AppModal>
  )
}
