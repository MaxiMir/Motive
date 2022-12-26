import { useMemo } from 'react'
import { Avatar } from '@mui/material'
import { getShortName } from './helpers/content'
import { generateColorByName } from './helpers/color'

interface PlugProps {
  name: string
  size: number
}

function Plug({ name, size }: PlugProps) {
  const bgcolor = useMemo(() => generateColorByName(name), [name])
  const shortName = getShortName(name)

  return (
    <Avatar
      sx={{
        bgcolor,
        width: size,
        height: size,
        color: 'common.white',
        fontSize: '1rem',
      }}
    >
      {shortName}
    </Avatar>
  )
}

export default Plug
