import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { useCharacteristicColor } from 'hook/useCharacteristicColor'
import { Characteristics } from 'dto/User/User'
import AppCircular from 'components/UI/AppCircular'
import AppBox from 'components/UI/AppBox'

interface UserCardAvatarProps {
  avatar: string
  characteristics: Characteristics
}

const UserCardAvatar = ({ avatar, characteristics }: UserCardAvatarProps) => {
  const classes = useStyles()
  const characteristicColor = useCharacteristicColor()

  return (
    <AppBox className={classes.root}>
      <AppBox
        justifyContent="center"
        alignItems="center"
        className={classes.circleBlock}
      >
        <AppCircular
          size={145}
          value={characteristics.motivation}
          color={characteristicColor.motivation}
        />
      </AppBox>
      <AppBox
        justifyContent="center"
        alignItems="center"
        className={classes.circleBlock}
      >
        <AppCircular
          size={120}
          value={characteristics.creativity}
          color={characteristicColor.creativity}
        />
      </AppBox>
      <AppBox
        justifyContent="center"
        alignItems="center"
        className={classes.circleBlock}
      >
        <AppCircular
          size={100}
          value={characteristics.support}
          color={characteristicColor.support}
        />
      </AppBox>
      <AppBox
        justifyContent="center"
        alignItems="center"
        className={classes.circleBlock}
      >
        <Image
          src={avatar}
          alt="avatar"
          width={80}
          height={80}
          className={classes.avatar}
        />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  circleBlock: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 150,
    height: 150,
  },
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardAvatar
