import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import { toUserName } from 'helpers/prepare'
import AppLink from 'components/UI/AppLink'

export interface AvatarProps extends UserBase {
  type: 'avatar'
  size: number
}

export default function Avatar({ firstName, lastName, avatar, href, size }: AvatarProps): JSX.Element {
  const classes = useStyles({ size })

  return (
    <AppLink href={href} title={toUserName(firstName, lastName)} className={classes.avatarLink}>
      <Image src={avatar} alt="avatar" width={size} height={size} objectFit="cover" className={classes.avatar} />
    </AppLink>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: (props: { size: number }) => props.size,
  },
  avatar: {
    borderRadius: '50%',
  },
})
