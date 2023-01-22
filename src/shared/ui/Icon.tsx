import { Box, BoxProps } from '@mui/material'

interface IconProps extends BoxProps {
  name: string
}

function Icon({ name, ...props }: IconProps) {
  return (
    <Box component="span" className="material-symbols-sharp" {...props}>
      {name}
    </Box>
  )
}

export default Icon
