import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicColors } from 'hooks/useCharacteristicColors'
import { UserCharacteristic, UserCharacteristicName } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppCircle from 'components/UI/AppCircle'

interface AvatarProps {
  avatar: string
  characteristic: UserCharacteristic
  characteristicColors: CharacteristicColors
}

interface CircleItem {
  name: UserCharacteristicName
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

const CIRCLE_ITEMS: CircleItem[] = [
  {
    name: 'creativity',
    size: 126,
    strokeWidth: 15,
    strokeWidthBg: 21,
  },
  {
    name: 'support',
    size: 113,
    strokeWidth: 17,
    strokeWidthBg: 22,
  },
  {
    name: 'motivation',
    size: 99,
    strokeWidth: 18,
    strokeWidthBg: 25,
  },
]

export default function Avatar({ avatar, characteristic, characteristicColors }: AvatarProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox className={classes.root}>
      {CIRCLE_ITEMS.map(({ name, ...props }) => (
        <AppBox justifyContent="center" alignItems="center" className={classes.circleBlock} key={name}>
          <AppCircle progress={(characteristic[name] % 1) * 100} color={characteristicColors[name]} {...props} />
        </AppBox>
      ))}
      <AppBox justifyContent="center" alignItems="center" className={classes.circleBlock}>
        <Image src={avatar} alt="" width={81} height={81} objectFit="cover" className={classes.avatar} />
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
