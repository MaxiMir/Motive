import { makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'

export interface InputAvatarProps {
  user: UserBaseDto
}

export default function InputAvatar({ user }: InputAvatarProps): JSX.Element {
  const { name, nickname } = user
  const classes = useStyles()
  const href = getUserHref(nickname)

  return (
    <AppLink title={name} href={href} className={classes.avatarLink}>
      <AppAvatar src={user.avatar} size={32} />
    </AppLink>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: 32,
  },
})
