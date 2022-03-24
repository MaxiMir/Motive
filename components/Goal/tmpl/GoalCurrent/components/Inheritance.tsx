import { UserBaseDto } from 'dto'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppTypography from 'components/UI/AppTypography'
import User from 'components/User'
import AppBox from 'components/UI/AppBox'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox justifyContent="center" className={classes.root}>
      <AppBox alignItems="center" spacing={0.5}>
        <AppTypography variant="caption">
          <b>with</b>
        </AppTypography>
        <User tmpl="avatar" user={owner} />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: -19,
      left: '50%',
      width: 90,
      padding: 4,
      transform: 'translateX(-50%)',
      borderRadius: 20,
      background: `linear-gradient(90deg, ${theme.palette.info.dark} 0%, ${theme.palette.success.dark} 100%)`,
    },
  }),
)
