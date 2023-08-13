import { Container as MuiContainer, ContainerProps } from '@mui/material'

function Container({ sx, ...props }: ContainerProps) {
  return (
    <MuiContainer
      fixed
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 2,
        mb: 2,
        ...sx,
      }}
      {...props}
    />
  )
}

export default Container
