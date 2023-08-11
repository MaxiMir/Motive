import { Box } from '@mui/material'
import { SphereDto } from 'shared/api'
import { generateColorByName } from 'shared/ui/palette'

interface EmptyProps {
  sphere: SphereDto
}

function Empty({ sphere }: EmptyProps) {
  const fillLight = generateColorByName(sphere, { saturation: 50, lightness: 30, range: 10 })
  const fillDark = generateColorByName(sphere)

  return <Box height="100%" sx={{ background: `linear-gradient(${fillLight}, ${fillDark})` }} />
}

export default Empty
