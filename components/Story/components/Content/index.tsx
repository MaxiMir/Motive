import { Box } from '@mui/material'
import { UserBaseDto } from 'dto'

interface ContentProps {
  user: UserBaseDto
}

export default function Content({ user }: ContentProps) {
  return (
    <Box
      sx={{
        transformStyle: 'preserve-3d',
        transform: 'rotateY(0)', // -90deg
        transitionDuration: '0ms', // 600ms
        width: '300vw',
        height: '100%',
        top: 0,
        bottom: 0,
        // left: '-100vw',
        position: 'absolute',
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        <Box display="flex" justifyContent="space-between">
          -
        </Box>
      </Box>
    </Box>
  )
}
