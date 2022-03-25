import clsx from 'clsx'
import { Button, createStyles, Grid, makeStyles } from '@material-ui/core'
import AppContainer from 'components/UI/AppContainer'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { TelegramIcon, LinkedInIcon } from 'components/UI/icons'
import AppIcon from 'components/UI/AppIcon'
import AppEmoji from 'components/UI/AppEmoji'

export default function ContactView(): JSX.Element {
  const classes = useStyles()

  const openBlank = (url: string) => window.open(url, '_blank')

  const onClickTelegram = () => openBlank('https://t.me/MaximMir')

  const onClickEmail = () => openBlank('mailto:mmirrev@gmail.com')

  const onClickLinkedIn = () => openBlank('https://www.linkedin.com/in/maxim-minchenko-085b26149/')

  return (
    <AppContainer flexColumn>
      <AppTitle name="contact" mb={4}>
        Contact Us
      </AppTitle>
      <AppBox flexDirection="column" spacing={2}>
        <AppTypography>
          Write to us with or without cause. Any feedback from you is welcome <AppEmoji name="wink" onlyEmoji />.
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
