import { Avatar } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

interface PlugProps {
  name: string
  size: number
}

export default function Plug({ name, size }: PlugProps) {
  const letter = name[0].toUpperCase()

  return (
    <Avatar
      sx={{
        bgcolor: blueGrey[300],
        width: size,
        height: size,
      }}
    >
      {letter}
    </Avatar>
  )
}
