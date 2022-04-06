import { useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { UserCharacteristicDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppCircle from 'components/UI/AppCircle'
import AppAvatar from 'components/UI/AppAvatar'
import { getCircleItems } from './helper'

interface AvatarProps {
  avatar?: string | null
  characteristic: UserCharacteristicDto
}

export default function Avatar({ avatar, characteristic }: AvatarProps): JSX.Element {
  const theme = useTheme()
  const circleItems = getCircleItems(characteristic)

  return (
    <AppBox sx={{ position: 'relative', width: 126, height: 126 }}>
      {circleItems.map(({ name, ...props }) => (
        <Circle justifyContent="center" alignItems="center" key={name}>
          <AppCircle light={theme.characteristic[name].light} dark={theme.characteristic[name].dark} {...props} />
        </Circle>
      ))}
      <Circle justifyContent="center" alignItems="center">
        <AppAvatar src={avatar} size={80} />
      </Circle>
    </AppBox>
  )
}

const Circle = styled(AppBox)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 126,
  height: 126,
})
