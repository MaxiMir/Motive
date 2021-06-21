import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { UserProps } from '../index'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'

const UserCardRating = ({ avatar, link }: UserProps) => {
  const classes = useStyles()

  return (
    <AppBox>
      <AppLink href={link}>
        <Image
          src={avatar}
          width={30}
          height={30}
          alt="avatar"
          className={classes.avatar}
        />
      </AppLink>
    </AppBox>
  )
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardRating
