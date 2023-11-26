import Badge, { badgeClasses, BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/system'

const BadgeRipple = styled((props: BadgeProps) => (
  <Badge overlap="circular" variant="dot" {...props} />
))(({ theme }) => ({
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
    from: {
      transform: 'scale(.8)',
      opacity: 1,
    },
    to: {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export default BadgeRipple
