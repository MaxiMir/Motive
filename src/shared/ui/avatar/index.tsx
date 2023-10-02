import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'

const BadgeRipple = dynamic(() => import('../BadgeRipple'))
const Plug = dynamic(() => import('./plug'))
const TunedAvatar = dynamic(() => import('./tunedAvatar'))

interface AvatarProps extends Omit<ButtonProps, 'size'> {
  name: string
  src?: string | null
  size: number
  badge?: boolean | null
}

function Avatar({ src, name, size, badge, ...buttonProps }: AvatarProps) {
  const role = buttonProps.onClick ? 'button' : 'img'

  return (
    <StyledButton role={role} {...buttonProps}>
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
