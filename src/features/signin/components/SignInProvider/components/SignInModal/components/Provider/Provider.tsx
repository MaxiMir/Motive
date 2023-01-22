import Image, { ImageProps } from 'next/image'
import { signIn, SignInOptions } from 'next-auth/react'
import { Box, Button } from '@mui/material'
import { useMessages } from './hooks/useMessages'

interface ProviderProps {
  id: string
  name: string
  options: SignInOptions
  src: ImageProps['src']
  disabled: boolean
}

function Provider({ id, name, options, src, disabled }: ProviderProps) {
  const messages = useMessages()

  return (
    <Button
      variant="outlined"
      startIcon={<Image src={src} alt={name} width={24} height={24} />}
      disabled={disabled}
      color="warning"
      onClick={() => signIn(id, options)}
    >
      <Box display="flex" justifyContent="flex-start" width={150}>
        {messages.signInText} {messages.withText} {name}
      </Box>
    </Button>
  )
}

export default Provider
