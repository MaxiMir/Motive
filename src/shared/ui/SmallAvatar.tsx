import { Avatar } from '@mui/material'
import { styled } from '@mui/system'

export const SmallAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'chip',
})<{ background?: string }>(({ theme, background }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  background,
}))
