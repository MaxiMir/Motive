import { Button, Stack, Typography } from '@mui/material'
import { lightBlue, red, yellow } from '@mui/material/colors'
import { styled } from '@mui/system'
import BTCSrc from 'public/images/svg/btc.svg'
import DOGESrc from 'public/images/svg/doge.svg'
import ETHSrc from 'public/images/svg/eth.svg'
import LTCSrc from 'public/images/svg/ltc.svg'
import Wallet from '@features/wallet'
import Container from '@shared/ui/Container'
import Emoji from '@shared/ui/Emoji'
import EmojiHeader from '@shared/ui/EmojiHeader'
import Email from '@shared/ui/icons/Email'
import LinkedIn from '@shared/ui/icons/LinkedIn'
import Telegram from '@shared/ui/icons/Telegram'
import { openBlank } from './lib/helpers/url'
import { useMessages } from './lib/hooks/useMessages'

const CRYPTOS = [
  { name: 'BTC', wallet: '1AmJZzeVH6wkJZ6a1FojJbHD1im9UZBar7', src: BTCSrc },
  { name: 'ETH', wallet: '0xc7a7b4c59999c27aaae8affcd9bd9eb1f4724806', src: ETHSrc },
  { name: 'LTC', wallet: 'LLspFKQebdgpq1YECXfjdkQKWTXZnmDBRA', src: LTCSrc },
  { name: 'DOGE', wallet: 'D9btjbEFVpCStxQAaCdUGw9AjMnvsAUvbr', src: DOGESrc },
]

function ContactPage() {
  const messages = useMessages()

  const onClickTelegram = () => openBlank('https://t.me/MaximMir')

  const onClickEmail = () => openBlank('mailto:mmirrev@gmail.com')

  const onClickLinkedIn = () => openBlank('https://www.linkedin.com/in/maximir/')

  return (
    <Container>
      <EmojiHeader name="contact" mb={3}>
        {messages.header}
      </EmojiHeader>
      <Stack spacing={3} mb={6}>
        <Typography>
          {messages.subheader} <Emoji name="wink" onlyEmoji />.
        </Typography>
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
        <EmojiHeader name="coin" variant="h1" component="h3">
          {messages.support}
        </EmojiHeader>
        <Stack spacing={1}>
          {CRYPTOS.map(({ name, wallet, src }) => (
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

export default ContactPage
