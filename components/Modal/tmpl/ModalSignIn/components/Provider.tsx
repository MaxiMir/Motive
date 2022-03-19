import Image from 'next/image'
import { signIn, SignInOptions } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react/types'
import { Button } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'

interface ProviderProps {
  provider: ClientSafeProvider
  options: SignInOptions
  disabled: boolean
}

export default function Provider({ provider, options, disabled }: ProviderProps): JSX.Element {
  const { id, name } = provider

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
      key={id}
      disabled={disabled}
      onClick={() => signIn(id, options)}
    >
      <AppBox width={100} justifyContent="flex-start">
        with {name}
      </AppBox>
    </Button>
  )
}
