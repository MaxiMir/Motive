import { Avatar } from '@mui/material'
import { useMemo } from 'react'
import { generateColorByName } from './lib/helpers/color'
import { getShortName } from './lib/helpers/content'

interface PlugProps {
  name: string
  size: number
}

function Plug({ name, size }: PlugProps) {
  const bgcolor = useMemo(() => generateColorByName(name), [name])
  const shortName = getShortName(name)
  const fontSize = size / 2.5

  return (
    <Avatar
      sx={{
        bgcolor,
        width: size,
        height: size,
        color: 'common.white',
        fontSize,
      }}
    >
      {shortName}
    </Avatar>
  )
}

export default Plug
