import { Container, ContainerProps } from '@mui/material'

function AppContainer(props: ContainerProps) {
  return (
    <Container
      fixed
      sx={(theme) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 3,
        mb: 2,
        [theme.breakpoints.only('xl')]: {
          maxWidth: 900,
        },
      })}
      {...props}
    />
  )
}

export default AppContainer
