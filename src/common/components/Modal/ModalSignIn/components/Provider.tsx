import Image, { ImageProps } from 'next/image'
import { useIntl } from 'react-intl'
import { signIn, SignInOptions } from 'next-auth/react'
import { Box, Button } from '@mui/material'

interface ProviderProps {
  id: string
  name: string
  options: SignInOptions
  src: ImageProps['src']
  disabled: boolean
}

function Provider({ id, name, options, src, disabled }: ProviderProps) {
  const { formatMessage } = useIntl()
  const withText = formatMessage({ id: 'common.with' })

  return (
    <Button
      variant="outlined"
      startIcon={<Image src={src} alt={name} width={24} height={24} />}
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

export default Provider
