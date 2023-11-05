import { Box } from '@mui/material'
import { SphereDto } from 'shared/api'
import { generateColorByName } from 'shared/ui/palette'

interface GradientProps {
  sphere: SphereDto
}

function Gradient({ sphere }: GradientProps) {
  const fillLight = generateColorByName(sphere)
  const fillDark = generateColorByName(sphere, { saturation: 50, lightness: 30, range: 10 })

  return <Box height="100%" sx={{ background: `linear-gradient(${fillDark}, ${fillLight})` }} />
}

export default Gradient
