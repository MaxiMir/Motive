import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppTypography from 'components/UI/AppTypography'
import AppAvatar from 'components/UI/AppAvatar'
import AppLink from 'components/UI/AppLink'

export interface UserOwnerProps {
  tmpl: 'owner'
  user: UserBaseDto
}

export default function Owner({ user }: UserOwnerProps): JSX.Element {
  const { nickname, name, avatar } = user
  const classes = useStyles()
  const href = getUserHref(nickname)

  return (
    <>
      <AppTypography variant="h6" className={classes.withText}>
        with
      </AppTypography>
      <AppLink href={href} title={name} className={classes.link}>
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
    link: {
      height: 26,
    },
  }),
)
