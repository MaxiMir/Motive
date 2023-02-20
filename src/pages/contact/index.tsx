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
      <Stack gap={3} mb={6}>
        <Typography variant="h1" component="h1">
          📮 {messages.header}
        </Typography>
        <Typography>{messages.subheader} 😉.</Typography>
        <Stack direction="row" gap={2}>
          <ButtonLink
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: yellow[500],
              ':hover': {
                borderColor: yellow[100],
              },
            }}
            onClick={onClickEmail}
          >
            <Stack alignItems="center" gap={1}>
              <Typography variant="caption">Email</Typography>
              <Email sx={{ color: yellow[500] }} />
            </Stack>
          </ButtonLink>
          <ButtonLink
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: lightBlue[500],
              ':hover': {
                borderColor: lightBlue[100],
              },
            }}
            onClick={onClickTelegram}
          >
            <Stack alignItems="center" gap={1}>
              <Typography variant="caption">Telegram</Typography>
              <Telegram sx={{ color: lightBlue[500] }} />
            </Stack>
          </ButtonLink>
          <ButtonLink
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: red[300],
              ':hover': {
                borderColor: red[100],
              },
            }}
            onClick={onClickLinkedIn}
          >
            <Stack alignItems="center" gap={1}>
              <Typography variant="caption">LinkedIn</Typography>
              <LinkedIn sx={{ color: red[300] }} />
            </Stack>
          </ButtonLink>
        </Stack>
      </Stack>
      <Stack gap={3}>
        <Typography variant="h1" component="h2">
          🪙 {messages.support}
        </Typography>
        <Stack gap={1}>
          {MY_WALLETS.map(({ name, wallet, src }) => (
            <Wallet name={name} wallet={wallet} src={src} key={name} />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

const ButtonLink = styled(Button)({
  width: 80,
  height: 80,
  borderRadius: 12,
})
