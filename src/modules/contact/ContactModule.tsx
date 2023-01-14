import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { lightBlue, red, yellow } from '@mui/material/colors'
import { openBlank } from '@helpers/window'
import AppContainer from '@ui/AppContainer'
import EmojiHeader from '@ui/EmojiHeader'
import AppEmoji from '@ui/AppEmoji'
import Telegram from '@ui/icons/Telegram'
import LinkedIn from '@ui/icons/LinkedIn'
import Email from '@ui/icons/Email'
import BTCSrc from 'public/images/svg/btc.svg'
import ETHSrc from 'public/images/svg/eth.svg'
import LTCSrc from 'public/images/svg/ltc.svg'
import DOGESrc from 'public/images/svg/doge.svg'
import { useMessages } from './hooks/useMessages'
import Wallet from './components/Wallet'

const CRYPTOS = [
  { name: 'BTC', wallet: '1AmJZzeVH6wkJZ6a1FojJbHD1im9UZBar7', src: BTCSrc },
  { name: 'ETH', wallet: '0xc7a7b4c59999c27aaae8affcd9bd9eb1f4724806', src: ETHSrc },
  { name: 'LTC', wallet: 'LLspFKQebdgpq1YECXfjdkQKWTXZnmDBRA', src: LTCSrc },
  { name: 'DOGE', wallet: 'D9btjbEFVpCStxQAaCdUGw9AjMnvsAUvbr', src: DOGESrc },
]

function ContactModule() {
  const messages = useMessages()

  const onClickTelegram = () => openBlank('https://t.me/MaximMir')

  const onClickEmail = () => openBlank('mailto:mmirrev@gmail.com')

  const onClickLinkedIn = () => openBlank('https://www.linkedin.com/in/maxim-minchenko-085b26149/')

  return (
    <AppContainer>
      <EmojiHeader name="contact" mb={3}>
        {messages.header}
      </EmojiHeader>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>
          {messages.subheader} <AppEmoji name="wink" onlyEmoji />.
        </Typography>
        <Box display="flex" gap={2}>
          <ButtonLink variant="outlined" sx={{ borderColor: yellow[500] }} onClick={onClickEmail}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="caption">Email</Typography>
              <Email sx={{ color: yellow[500] }} />
            </Box>
          </ButtonLink>
          <ButtonLink
            variant="outlined"
            sx={{ borderColor: lightBlue[500] }}
            onClick={onClickTelegram}
          >
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="caption">Telegram</Typography>
              <Telegram sx={{ color: lightBlue[500] }} />
            </Box>
          </ButtonLink>
          <ButtonLink variant="outlined" sx={{ borderColor: red[300] }} onClick={onClickLinkedIn}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="caption">LinkedIn</Typography>
              <LinkedIn sx={{ color: red[300] }} />
            </Box>
          </ButtonLink>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} mt={3}>
          <EmojiHeader name="coin" variant="h1" component="h3" mb={3}>
            {messages.support}
          </EmojiHeader>
          {CRYPTOS.map(({ name, wallet, src }) => (
            <Wallet name={name} wallet={wallet} src={src} key={name} />
          ))}
        </Box>
      </Box>
    </AppContainer>
  )
}

const ButtonLink = styled(Button)(({ theme }) => ({
  width: 80,
  height: 80,
  color: theme.palette.common.white,
  borderRadius: 12,
  '&:hover': {
    opacity: 0.8,
  },
}))

export default ContactModule
