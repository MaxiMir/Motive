import { Badge } from '@mui/material'
import { badgeClasses } from '@mui/material/Badge'
import { styled } from '@mui/system'

function Online() {
  return <StyledBadge overlap="circular" variant="dot" />
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  width: 16,
  [`& .${badgeClasses.badge}`]: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    borderRadius: '50%',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export default Online
