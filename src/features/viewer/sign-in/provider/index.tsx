import { Box, Button } from '@mui/material'
import { brown } from '@mui/material/colors'
import { styled } from '@mui/system'
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
    <StyledButton
      variant="outlined"
      startIcon={<Image src={src} alt={name} width={24} height={24} />}
      disabled={disabled}
      onClick={() => signIn(id, options)}
    >
      <Box display="flex" justifyContent="flex-start" width={150}>
        {signInText} {withText} {name}
      </Box>
    </StyledButton>
  )
}

const StyledButton = styled(Button)({
  color: brown.A200,
  borderColor: brown.A200,
  '&:hover': {
    borderColor: brown.A100,
  },
})

export default Provider
