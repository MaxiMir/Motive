import { makeStyles } from '@mui/styles'
import { UserCharacteristicDto } from 'dto'
import { CharacteristicColors } from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppCircle from 'components/UI/AppCircle'
import AppAvatar from 'components/UI/AppAvatar'
import { getCircleItems } from './helper'

interface AvatarProps {
  avatar?: string | null
  characteristic: UserCharacteristicDto
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
        <AppAvatar src={avatar} size={80} />
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 126,
    height: 126,
  },
})
