import Image from 'next/image'
import { signIn, SignInOptions } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react/types'
import { Button } from '@material-ui/core'

interface ProviderProps {
  provider: ClientSafeProvider
  options: SignInOptions
}

export default function Provider({ provider, options }: ProviderProps): JSX.Element {
  const { id, name } = provider

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
      key={id}
      onClick={() => signIn(id, options)}
    >
      with {name}
    </Button>
  )
}
