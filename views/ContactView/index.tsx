import { Button, createStyles, makeStyles } from '@material-ui/core'
import AppContainer from 'components/UI/AppContainer'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { TelegramIcon, LinkedInIcon } from 'components/UI/icons'
import AppIcon from 'components/UI/AppIcon'

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
        <AppTypography>Write to us with or without cause. Any feedback from you is welcome 😉.</AppTypography>
        <AppBox flexWrap="wrap" spacing={2}>
          <Button className={classes.button} onClick={onClickEmail}>
            <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
              <AppBox flexDirection="column" alignItems="center" spacing={2}>
                <AppTypography variant="h5" component="p">
                  Email
                </AppTypography>
                <AppIcon name="email" className={classes.icon} />
              </AppBox>
            </AppBox>
          </Button>
          <Button className={classes.button} onClick={onClickTelegram}>
            <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
              <AppBox flexDirection="column" alignItems="center" spacing={2}>
                <AppTypography variant="h5" component="p">
                  Telegram
                </AppTypography>
                <TelegramIcon className={classes.icon} />
              </AppBox>
            </AppBox>
          </Button>
          <Button className={classes.button} onClick={onClickLinkedIn}>
            <AppBox alignItems="center" justifyContent="center" className={classes.wrap}>
              <AppBox flexDirection="column" alignItems="center" spacing={2}>
                <AppTypography variant="h5" component="p">
                  LinkedIn
                </AppTypography>
                <LinkedInIcon className={classes.icon} />
              </AppBox>
            </AppBox>
          </Button>
        </AppBox>
      </AppBox>
    </AppContainer>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      flex: '1 1 calc(25% - 12px)',
      paddingBottom: 'calc(25% - 12px)',
      maxWidth: 'calc(25% - 12px)',
      height: 0,
      flexGrow: 0,
      borderRadius: 12,
      background: `linear-gradient(to top left, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
      '&:hover': {
        opacity: 0.8,
      },
      '&:nth-child(2)': {
        background: `linear-gradient(to top left, ${theme.palette.success.light}, ${theme.palette.success.dark})`,
      },
      '&:last-child': {
        background: `linear-gradient(to top left, ${theme.palette.info.light}, ${theme.palette.info.dark})`,
      },
      [theme.breakpoints.down('xs')]: {
        flex: '1 1 calc(100% - 12px)',
        paddingBottom: 'calc(100% - 12px)',
        maxWidth: 'initial',
      },
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
