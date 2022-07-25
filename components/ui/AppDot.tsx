import { Box } from '@mui/material'

interface AppDotProps {
  size?: number
}

export default function AppDot({ size = 3 }: AppDotProps) {
  return (
    <Box
      display="flex"
      width={size}
      height={size}
      sx={{
        borderRadius: '50%',
        backgroundColor: '#424242',
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    />
  )
}