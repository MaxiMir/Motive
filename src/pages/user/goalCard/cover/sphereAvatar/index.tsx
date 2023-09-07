import { Avatar, Box } from '@mui/material'
import { styled } from '@mui/system'
import { SPHERE_ICONS } from 'entities/characteristic'
import { SphereDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { generateColorByName } from 'shared/ui/palette'

interface SphereAvatarProps {
  sphere: SphereDto
}

export function SphereAvatar({ sphere }: SphereAvatarProps) {
  const background = generateColorByName(sphere)
  const name = SPHERE_ICONS[sphere]

  return (
    <StyledBox>
      <Avatar sx={{ width: 60, height: 60, background, border: '2px solid black' }}>
        <Icon name={name} color="common.white" />
      </Avatar>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  position: 'absolute',
  left: 8,
  bottom: -30,
  zIndex: 1,
})
