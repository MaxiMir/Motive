import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import { getFontSize } from './helper'

interface NoAvatarProps {
  size: number
}

export default function NoAvatar({ size }: NoAvatarProps): JSX.Element {
  const fontSize = getFontSize(size)

  return (
    <AppBox justifyContent="center" alignItems="center" sx={{ borderRadius: '50%', width: size }}>
      <AppEmoji name="followers" sx={{ fontSize }} />
    </AppBox>
  )
}
