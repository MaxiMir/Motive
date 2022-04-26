import { Box } from '@mui/material'
import AppImage from 'components/UI/AppImage'

interface AvatarProps {
  src: string
  size: number
}

export default function Avatar({ src, size }: AvatarProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={size}
      height={size}
      sx={{ borderRadius: '50%', overflow: 'hidden' }}
    >
      <AppImage src={src} alt="" width={size} height={size} objectFit="cover" />
    </Box>
  )
}
