import { Avatar } from '@mui/material'
import { styled } from '@mui/system'
import { getStaticSrc } from 'shared/lib/helpers'

interface TunedAvatarProps {
  src: string
  size: number
}

function TunedAvatar({ src, size }: TunedAvatarProps) {
  const staticSrc = getStaticSrc(src, size * 2)

  return <StyledAvatar src={staticSrc} alt="" draggable={false} size={size} />
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: number }>(({ theme: _, size }) => ({
  width: size,
  height: size,
  pointerEvents: 'none',
}))

export default TunedAvatar
