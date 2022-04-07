import { Container, ContainerProps } from '@mui/material'

export default function AppContainer(props: ContainerProps): JSX.Element {
  return (
    <Container
      fixed
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 3,
      }}
      {...props}
    />
  )
}
