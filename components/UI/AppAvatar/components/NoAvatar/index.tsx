import { Box } from '@mui/material'
import AppEmoji from 'components/UI/AppEmoji'
import { getFontSize } from './helper'

interface NoAvatarProps {
  size: number
}

export default function NoAvatar({ size }: NoAvatarProps): JSX.Element {
  const fontSize = getFontSize(size)

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ borderRadius: '50%', width: size }}>
      <AppEmoji name="followers" sx={{ fontSize }} />
    </Box>
  )
}
