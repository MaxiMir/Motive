import dynamic from 'next/dynamic'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { Locale } from 'hooks/useLocale'
import AppContainer from 'components/UI/AppContainer'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import { TelegramIcon, LinkedInIcon } from 'components/UI/icons'
import AppIcon from 'components/UI/AppIcon'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const Wallet = dynamic(() => import('./components/Wallet'))

const CRYPTOS = [
  { name: 'BTC', wallet: '1AmJZzeVH6wkJZ6a1FojJbHD1im9UZBar7' },
  { name: 'ETH', wallet: '0xc7a7b4c59999c27aaae8affcd9bd9eb1f4724806' },
  { name: 'LTC', wallet: 'LLspFKQebdgpq1YECXfjdkQKWTXZnmDBRA' },
  { name: 'DOGE', wallet: 'D9btjbEFVpCStxQAaCdUGw9AjMnvsAUvbr' },
]

interface ContactViewProps {
  locale: Locale
}

export default function ContactView({ locale }: ContactViewProps): JSX.Element {
  const theme = useTheme()
  const { header, subheader, support } = i18n[locale]

  const openBlank = (url: string) => window.open(url, '_blank')

  const onClickTelegram = () => openBlank('https://t.me/MaximMir')

  const onClickEmail = () => openBlank('mailto:mmirrev@gmail.com')

  const onClickLinkedIn = () => openBlank('https://www.linkedin.com/in/maxim-minchenko-085b26149/')

  return (
    <AppContainer>
      <AppTitle name="contact" mb={3}>
        {header}
      </AppTitle>
      <AppBox flexDirection="column" gap={2}>
        <Typography>
          {subheader} <AppEmoji name="wink" onlyEmoji />.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <ButtonLink
              sx={{
                background: `linear-gradient(to top left, ${theme.palette.motivation.light}, ${theme.palette.motivation.dark})`,
              }}
              onClick={onClickEmail}
            >
              <ButtonContent alignItems="center" justifyContent="center">
                <AppBox flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h5" component="p">
                    Email
                  </Typography>
                  <AppIcon name="email" />
                </AppBox>
              </ButtonContent>
            </ButtonLink>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <ButtonLink
              sx={{
                background: `linear-gradient(to top left, ${theme.palette.creativity.light}, ${theme.palette.creativity.dark})`,
              }}
              onClick={onClickTelegram}
            >
              <ButtonContent alignItems="center" justifyContent="center">
                <AppBox flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h5" component="p">
                    Telegram
                  </Typography>
                  <TelegramIcon />
                </AppBox>
              </ButtonContent>
            </ButtonLink>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <ButtonLink
              sx={{
                background: `linear-gradient(to top left, ${theme.palette.support.light}, ${theme.palette.support.dark})`,
              }}
              onClick={onClickLinkedIn}
            >
              <ButtonContent alignItems="center" justifyContent="center">
                <AppBox flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h5" component="p">
                    LinkedIn
                  </Typography>
                  <LinkedInIcon />
                </AppBox>
              </ButtonContent>
            </ButtonLink>
          </Grid>
        </Grid>
        <AppBox flexDirection="column" gap={1} mt={3}>
          <AppTitle name="coin" variant="h1" component="h3" mb={3}>
            {support}
          </AppTitle>
          {CRYPTOS.map(({ name, wallet }) => (
            <Wallet name={name} wallet={wallet} key={name} />
          ))}
        </AppBox>
      </AppBox>
    </AppContainer>
  )
}

const ButtonLink = styled(Button)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1',
  borderRadius: 12,
  color: theme.palette.common.white,
  '&:hover': {
    opacity: 0.8,
  },
  '& .material-icons': {
    fontSize: '4em',
  },
  '& svg': {
    fontSize: '4em',
  },
}))

const ButtonContent = styled(AppBox)({
  width: '100%',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  color: 'common.white',
})
