import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppTypography from 'components/UI/AppTypography'
import AppAvatar from 'components/UI/AppAvatar'
import AppLink from 'components/UI/AppLink'

export default function Owner({ nickname, avatar }: UserBaseDto): JSX.Element {
  const classes = useStyles()
  const href = getUserHref(nickname)

  return (
    <>
      <AppTypography variant="h6" className={classes.withText}>
        with
      </AppTypography>
      <AppAvatar src={avatar} size={26} />
      <AppLink href={href}>
        <AppAvatar src={avatar} size={26} />
      </AppLink>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    withText: {
      color: theme.palette.warning.main,
    },
  }),
)
