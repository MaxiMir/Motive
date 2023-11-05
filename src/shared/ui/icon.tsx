import { Box, BoxProps } from '@mui/material'

interface IconProps extends Omit<BoxProps, 'fontSize'> {
  name: string
  fontSize?: number
}

function Icon({ name, fontSize, ...props }: IconProps) {
  return (
    <Box
      component="span"
      className="material-symbols-sharp"
      fontSize={fontSize && `${fontSize}px !important`}
      {...props}
    >
      {name}
    </Box>
  )
}

export default Icon
