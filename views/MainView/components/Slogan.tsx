import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

export default function Slogan(): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox alignItems="center" justifyContent="center" className={classes.root}>
      <AppBox flexDirection="column" alignItems="center">
        <AppTypography variant="h4" align="center" component="h1" className={classes.name}>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </AppTypography>
        <AppTypography align="center" className={classes.subheader}>
          your assistant to achieve your goals
        </AppTypography>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 120,
      backgroundColor: '#ffffff',
    },
    name: {
      background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      color: theme.palette.info.dark,
      fontWeight: 500,
    },
    subheader: {
      color: '#A1A1A6',
    },
  }),
)
