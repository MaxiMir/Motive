import { Avatar } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

interface NoAvatarProps {
  name: string
  size: number
}

export default function NoAvatar({ name, size }: NoAvatarProps) {
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
