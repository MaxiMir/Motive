import AppBox from './AppBox'

interface AppDotProps {
  size?: number
}

export default function AppDot({ size = 3 }: AppDotProps): JSX.Element {
  return (
    <AppBox
      width={size}
      height={size}
      sx={{
        borderRadius: '50%',
        backgroundColor: '#424242',
      }}
    />
  )
}
