import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'

const BadgeRipple = dynamic(() => import('../badge-ripple'))
const Plug = dynamic(() => import('./plug'))
const TunedAvatar = dynamic(() => import('./tuned-avatar'))

interface AvatarProps extends Omit<ButtonProps, 'size'> {
  name: string
  src?: string | null
  size: number
  badge?: boolean | null
}

function Avatar({ src, name, size, badge, ...buttonProps }: AvatarProps) {
  const role = buttonProps.onClick ? 'button' : 'img'
  const component = buttonProps.onClick ? 'button' : 'div'

  return (
    <StyledButton role={role} component={component} {...buttonProps}>
      {!src ? <Plug name={name} size={size} /> : <TunedAvatar src={src} size={size} />}
      {badge && <BadgeRipple sx={{ position: 'absolute', bottom: '20%', right: '15%' }} />}
    </StyledButton>
  )
}

const StyledButton = styled(Button)({
  position: 'relative',
  minWidth: 'initial',
  padding: '3px',
  borderRadius: '50%',
}) as typeof Button

export default Avatar
