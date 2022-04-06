import { Container, ContainerProps } from '@mui/material'

type AppContainerProps = Omit<ContainerProps, 'fixed'> & {
  flexColumn?: boolean
}

export default function AppContainer({
  className,
  flexColumn = false,
  children,
  style,
  ...props
}: AppContainerProps): JSX.Element {
  const defaultSx = !flexColumn
    ? {}
    : {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }

  return (
    <Container fixed sx={{ ...defaultSx, ...style }} {...props}>
      {children}
    </Container>
  )
}
