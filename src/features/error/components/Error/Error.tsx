import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import AppEmoji from '@ui/AppEmoji'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'

interface CustomErrorProps {
  statusCode: number
}

function Error({ statusCode }: CustomErrorProps) {
  const messages = useMessages(statusCode)
  const router = useRouter()

  const onClick = () => router.back()

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h1" variant="h5">
            {messages.header}
          </Typography>
          <DescriptionText>{statusCode}</DescriptionText>
          <DescriptionText>
            <AppEmoji name="error" onlyEmoji />
          </DescriptionText>
          <Button sx={{ color: 'warning.light' }} onClick={onClick}>
            {messages.backText}
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

const DescriptionText = styled(Typography)({
  fontSize: '9em',
})
export default Error
