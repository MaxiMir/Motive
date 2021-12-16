import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicColors } from 'hooks/useCharacteristicColors'
import { UserCharacteristic } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppCircle from 'components/UI/AppCircle'
import { getCircleItems } from './helper'

interface AvatarProps {
  avatar: string
  characteristic: UserCharacteristic
  characteristicColors: CharacteristicColors
}

export default function Avatar({ avatar, characteristic, characteristicColors }: AvatarProps): JSX.Element {
  const classes = useStyles()
  const circleItems = getCircleItems(characteristic)

  return (
    <AppBox className={classes.root}>
      {circleItems.map(({ name, ...props }) => (
        <AppBox justifyContent="center" alignItems="center" className={classes.circle} key={name}>
          <AppCircle color={characteristicColors[name]} {...props} />
        </AppBox>
      ))}
      <AppBox justifyContent="center" alignItems="center" className={classes.circle}>
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
  circle: {
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