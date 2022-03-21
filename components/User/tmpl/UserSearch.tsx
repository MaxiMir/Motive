import { makeStyles } from '@material-ui/core'
import { UserBaseDto } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'
import AppBox from 'components/UI/AppBox'
import { getUserHref } from 'views/UserView/helper'

export interface UserSearchProps {
  tmpl: 'search'
  user: UserBaseDto
}

export default function UserSearch({ user }: UserSearchProps): JSX.Element {
  const classes = useStyles()
  const { nickname, avatar, name, characteristic } = user
  const href = getUserHref(nickname)

  return (
    <AppBox flexDirection="column" className={classes.root}>
      <AppLink href={href}>
        <AppAvatar src={avatar} size={80} />
      </AppLink>
      <AppLink href={href} variant="body1">
        {name}
      </AppLink>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    flex: '1 1 calc(16% - 13px)',
    paddingBottom: 'calc(16% - 13px)',
    height: 0,
    flexGrow: 0,
    borderRadius: 12,
    // [theme.breakpoints.between('sm', 'md')]: {
    //   flex: '1 1 calc(25% - 12px)',
    //   paddingBottom: 'calc(25% - 12px)',
    //   maxWidth: 'calc(25% - 12px)',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   flex: '1 1 calc(50% - 12px)',
    //   paddingBottom: 'calc(50% - 12px)',
    // },
  },
  wrap: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(1, 1, 1, 0.1)',
  },
  count: {
    alignSelf: 'flex-end',
    opacity: 0.5,
  },
})
