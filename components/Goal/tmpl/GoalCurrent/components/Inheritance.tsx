import { Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { UserBaseDto } from 'dto'
import User from 'components/User'
import AppBox from 'components/UI/AppBox'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox justifyContent="center" className={classes.root}>
      <AppBox alignItems="center" gap={0.5}>
        <Typography variant="caption">
          <b>with</b>
        </Typography>
        <User tmpl="avatar" user={owner} />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: -19,
      left: '50%',
      width: 90,
      padding: 4,
      transform: 'translateX(-50%)',
      borderRadius: 20,
      background: `linear-gradient(90deg, ${theme.palette.support.dark} 0%, ${theme.palette.creativity.dark} 100%)`,
    },
  }),
)
