import AppImage from 'components/UI/AppImage'
import AppBox from 'components/UI/AppBox'

interface AvatarProps {
  src: string
  size: number
}

export default function Avatar({ src, size }: AvatarProps): JSX.Element {
  return (
    <AppBox
      justifyContent="center"
      alignItems="center"
      width={size}
      height={size}
      sx={{ borderRadius: '50%', overflow: 'hidden' }}
    >
      <AppImage src={src} alt="" width={size} height={size} objectFit="cover" />
    </AppBox>
  )
}
