import { Container as MuiContainer, ContainerProps } from '@mui/material'

function Container(props: ContainerProps) {
  return (
    <MuiContainer
      fixed
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 3,
        mb: 2,
      }}
      {...props}
    />
  )
}

export default Container
