import { Container, ContainerProps } from '@mui/material'

function AppContainer(props: ContainerProps) {
  return (
    <Container
      fixed
      sx={({ breakpoints }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 3,
        mb: 2,
        [breakpoints.only('xl')]: {
          maxWidth: 900,
        },
      })}
      {...props}
    />
  )
}

export default AppContainer
