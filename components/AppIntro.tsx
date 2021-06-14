import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { AppBox } from 'components/UI/AppBox'

export const AppIntro: FC = () => {
  const classes = useStyles()

  return (
    <AppBox
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <AppBox flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          align="center"
          component="h1"
          className={classes.header}
        >
          BE Better
        </Typography>
        <Typography align="center" className={classes.subheader}>
          your assistant to achieve your goals
        </Typography>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    height: 120,
    backgroundColor: '#ffffff',
  },
  header: {
    background: 'linear-gradient(90deg, #FF9800, #673AB7, #03A9F4)',
    'background-clip': 'text',
    'text-fill-color': 'transparent',
    color: '#03A9F4',
    fontWeight: 500,
  },
  subheader: {
    color: '#A1A1A6',
    fontWeight: 500,
  },
})
