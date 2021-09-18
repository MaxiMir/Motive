import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicColors } from 'hooks/useCharacteristicColors'
import { UserCharacteristics, UserCharacteristic } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppCircle from 'components/UI/AppCircle'

interface UserCardAvatarProps {
  avatar: string
  characteristics: UserCharacteristics
  characteristicColors: CharacteristicColors
}

interface CircleItem {
  type: UserCharacteristic
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

const CIRCLE_ITEMS: CircleItem[] = [
  {
    type: 'creativity',
    size: 126,
    strokeWidth: 15,
    strokeWidthBg: 21,
  },
  {
    type: 'support',
    size: 113,
    strokeWidth: 17,
    strokeWidthBg: 22,
  },
  {
    type: 'motivation',
    size: 99,
    strokeWidth: 18,
    strokeWidthBg: 25,
  },
]

const UserCardAvatar = ({ avatar, characteristics, characteristicColors }: UserCardAvatarProps): JSX.Element => {
  const classes = useStyles()

  return (
    <AppBox className={classes.root}>
      {CIRCLE_ITEMS.map(({ type, ...props }) => (
        <AppBox justifyContent="center" alignItems="center" className={classes.circleBlock} key={type}>
          <AppCircle progress={(characteristics[type] % 1) * 100} color={characteristicColors[type]} {...props} />
        </AppBox>
      ))}
      <AppBox justifyContent="center" alignItems="center" className={classes.circleBlock}>
        <Image src={avatar} alt="avatar" width={81} height={81} objectFit="cover" className={classes.avatar} />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 126,
    height: 126,
  },
  circleBlock: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 126,
    height: 126,
  },
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardAvatar
