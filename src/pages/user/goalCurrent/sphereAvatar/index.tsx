import { Avatar } from '@mui/material'
import { SphereDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { generateColorByName } from 'shared/ui/palette'
import { ICONS } from './consts'

interface SphereAvatarProps {
  sphere: SphereDto
}

export function SphereAvatar({ sphere }: SphereAvatarProps) {
  const background = generateColorByName(sphere)
  const name = ICONS[sphere]

  return (
    <Avatar sx={{ width: 60, height: 60, background, border: '2px solid black' }}>
      <Icon name={name} color="common.white" />
    </Avatar>
  )
}
