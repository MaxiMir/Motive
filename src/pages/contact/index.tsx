import { Button, Stack, Typography } from '@mui/material'
import { lightBlue, red, yellow } from '@mui/material/colors'
import { styled } from '@mui/system'
import Container from 'shared/ui/Container'
import { Email, LinkedIn, Telegram } from 'shared/ui/icons'
import { MY_WALLETS } from './consts'
import { useMessages } from './lib'
import { Wallet } from './wallet'

export function ContactPage() {
  const messages = useMessages()

  const onClickTelegram = () => window.open('https://t.me/MaximMir', '_blank')

  const onClickEmail = () => window.open('mailto:mmirrev@gmail.com', '_blank')

  const onClickLinkedIn = () => window.open('https://www.linkedin.com/in/maximir/', '_blank')

  return (
    <Container>
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        📮 {messages.header}
      </Typography>
      <Stack spacing={3} mb={6}>
        <Typography>{messages.subheader} 😉.</Typography>
        <Stack direction="row" spacing={2} mb={4}>
          <ButtonLink
            variant="outlined"
            sx={{
              borderColor: yellow[500],
              ':hover': {
                borderColor: yellow[100],
              },
            }}
            onClick={onClickEmail}
          >
            <Stack alignItems="center" spacing={1}>
              <Typography variant="caption">Email</Typography>
              <Email sx={{ color: yellow[500] }} />
            </Stack>
          </ButtonLink>
          <ButtonLink
            variant="outlined"
            sx={{
              borderColor: lightBlue[500],
              ':hover': {
                borderColor: lightBlue[100],
              },
            }}
            onClick={onClickTelegram}
          >
            <Stack alignItems="center" spacing={1}>
              <Typography variant="caption">Telegram</Typography>
              <Telegram sx={{ color: lightBlue[500] }} />
            </Stack>
          </ButtonLink>
          <ButtonLink
            variant="outlined"
            sx={{
              borderColor: red[300],
              ':hover': {
                borderColor: red[100],
              },
            }}
            onClick={onClickLinkedIn}
          >
            <Stack alignItems="center" spacing={1}>
              <Typography variant="caption">LinkedIn</Typography>
              <LinkedIn sx={{ color: red[300] }} />
            </Stack>
          </ButtonLink>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h1" component="h2" sx={{ mb: 3 }}>
          🪙 {messages.support}
        </Typography>
        <Stack spacing={1}>
          {MY_WALLETS.map(({ name, wallet, src }) => (
            <Wallet name={name} wallet={wallet} src={src} key={name} />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

const ButtonLink = styled(Button)(({ theme }) => ({
  width: 80,
  height: 80,
  color: theme.palette.common.white,
  borderRadius: 12,
}))
