import { Avatar } from '@mui/material'
import { useMemo } from 'react'
import { getShortName } from 'entities/user'
import { generateColorByName } from './lib'

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
