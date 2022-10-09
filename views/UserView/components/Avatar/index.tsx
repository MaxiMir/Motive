import { Box, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { UserCharacteristicDto } from 'dto'
import AppCircle from 'components/ui/AppCircle'
import AppAvatar from 'components/ui/AppAvatar'
import { getCircleItems } from './helper'

interface AvatarProps {
  src?: string | null
  userName: string
  characteristic: UserCharacteristicDto
}

export default function Avatar({ src, userName, characteristic }: AvatarProps) {
  const theme = useTheme()
  const circleItems = getCircleItems(characteristic)

  return (
    <Box sx={{ position: 'relative', width: 126, height: 126 }}>
      {circleItems.map(({ name, ...props }) => (
        <Circle display="flex" justifyContent="center" alignItems="center" key={name}>
          <AppCircle light={theme.palette[name].light} dark={theme.palette[name].dark} {...props} />
        </Circle>
      ))}
      <Circle display="flex" justifyContent="center" alignItems="center">
        <AppAvatar src={src} name={userName} size={80} />
      </Circle>
    </Box>
  )
}

const Circle = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 126,
  height: 126,
})
