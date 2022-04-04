import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { Button, createStyles, Grid, makeStyles } from '@material-ui/core'
import useLocale from 'hooks/useLocale'
import AppContainer from 'components/UI/AppContainer'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
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

export default function ContactView(): JSX.Element {
  const classes = useStyles()
  const { locale } = useLocale()
  const { header, subheader, support } = i18n[locale]

  const openBlank = (url: string) => window.open(url, '_blank')

  const onClickTelegram = () => openBlank('https://t.me/MaximMir')

  const onClickEmail = () => openBlank('mailto:mmirrev@gmail.com')

  const onClickLinkedIn = () => openBlank('https://www.linkedin.com/in/maxim-minchenko-085b26149/')

  return (
    <AppContainer flexColumn>
      <AppTitle name="contact" mb={4}>
        {header}
      </AppTitle>
      <AppBox flexDirection="column" spacing={2}>
        <AppTypography>
          {subheader} <AppEmoji name="wink" onlyEmoji />.
        </AppTypography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Button className={clsx(classes.button, classes.buttonEmail)} onClick={onClickEmail}>
              <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
                <AppBox flexDirection="column" alignItems="center" spacing={2}>
                  <AppTypography variant="h5" component="p">
                    Email
                  </AppTypography>
                  <AppIcon name="email" className={classes.icon} />
                </AppBox>
              </AppBox>
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Button className={clsx(classes.button, classes.buttonTelegram)} onClick={onClickTelegram}>
              <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
                <AppBox flexDirection="column" alignItems="center" spacing={2}>
                  <AppTypography variant="h5" component="p">
                    Telegram
                  </AppTypography>
                  <TelegramIcon className={classes.icon} />
                </AppBox>
              </AppBox>
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Button className={clsx(classes.button, classes.buttonLinkedIn)} onClick={onClickLinkedIn}>
              <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
                <AppBox flexDirection="column" alignItems="center" spacing={2}>
                  <AppTypography variant="h5" component="p">
                    LinkedIn
                  </AppTypography>
                  <LinkedInIcon className={classes.icon} />
                </AppBox>
              </AppBox>
            </Button>
          </Grid>
        </Grid>
        <AppBox flexDirection="column" spacing={1} mt={4}>
          <AppTitle name="coin" variant="h1" component="h3">
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

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      width: '100%',
      aspectRatio: '1',
      borderRadius: 12,
      '&:hover': {
        opacity: 0.8,
      },
    },
    buttonEmail: {
      background: `linear-gradient(to top left, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
    },
    buttonTelegram: {
      background: `linear-gradient(to top left, ${theme.palette.success.light}, ${theme.palette.success.dark})`,
    },
    buttonLinkedIn: {
      background: `linear-gradient(to top left, ${theme.palette.info.light}, ${theme.palette.info.dark})`,
    },
    wrap: {
      width: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    icon: {
      fontSize: '4em !important',
    },
  }),
)
