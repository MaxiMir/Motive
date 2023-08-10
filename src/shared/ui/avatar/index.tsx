import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'

const Plug = dynamic(() => import('./plug'))
const TunedAvatar = dynamic(() => import('./tunedAvatar'))

interface AvatarProps extends Omit<ButtonProps, 'size'> {
  name: string
  src?: string | null
  size: number
}

function Avatar({ src, name, size, ...buttonProps }: AvatarProps) {
  return (
    <StyledButton component="span" {...buttonProps}>
      {!src ? <Plug name={name} size={size} /> : <TunedAvatar src={src} size={size} />}
    </StyledButton>
  )
}

const StyledButton = styled(Button)({
  minWidth: 'initial',
  padding: '3px',
  borderRadius: '50%',
}) as typeof Button

export default Avatar
