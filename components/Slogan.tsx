import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'

export default function Slogan(): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox alignItems="center" justifyContent="center" className={classes.root}>
      <AppBox flexDirection="column" alignItems="center">
        <Typography variant="h4" align="center" component="h1" className={classes.header}>
          Be Better
        </Typography>
        <Typography align="center" className={classes.subheader}>
          your assistant to achieve your goals
        </Typography>
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
    header: {
      background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      color: theme.palette.info.dark,
      fontWeight: 500,
    },
    subheader: {
      color: '#A1A1A6',
      fontWeight: 500,
    },
  }),
)
