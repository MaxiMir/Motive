import { Box, Button } from '@mui/material'
import { signIn, SignInOptions } from 'next-auth/react'
import { useIntl } from 'react-intl'
import Image, { ImageProps } from 'next/image'

interface ProviderProps {
  id: string
  name: string
  options: SignInOptions
  src: ImageProps['src']
  disabled: boolean
}

function Provider({ id, name, options, src, disabled }: ProviderProps) {
  const { formatMessage } = useIntl()
  const signInText = formatMessage({ id: 'common.sign-in' })
  const withText = formatMessage({ id: 'common.with' })

  return (
    <Button
      variant="outlined"
      startIcon={<Image src={src} alt={name} width={24} height={24} />}
      disabled={disabled}
      color="warning"
      onClick={() => signIn(id, options)}
    >
      <Box display="flex" justifyContent="flex-start" width={150}>
        {signInText} {withText} {name}
      </Box>
    </Button>
  )
}

export default Provider
