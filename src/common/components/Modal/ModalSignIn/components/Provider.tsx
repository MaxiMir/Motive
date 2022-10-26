import { useIntl } from 'react-intl'
import Image from 'next/image'
import { signIn, SignInOptions } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react/types'
import { Box, Button } from '@mui/material'

interface ProviderProps {
  provider: ClientSafeProvider
  options: SignInOptions
  disabled: boolean
}

export default function Provider({ provider, options, disabled }: ProviderProps) {
  const { id, name } = provider
  const { formatMessage } = useIntl()
  const withText = formatMessage({ id: 'common.with' })

  return (
    <Button
      variant="outlined"
      startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
      disabled={disabled}
      color="warning"
      key={id}
      onClick={() => signIn(id, options)}
    >
      <Box display="flex" width={120} justifyContent="flex-start">
        {withText} {name}
      </Box>
    </Button>
  )
}
