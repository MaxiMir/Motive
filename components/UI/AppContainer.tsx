import { Container, ContainerProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type AppContainerProps = Omit<ContainerProps, 'fixed'> & {
  withFlexColumn?: boolean
}

export default function AppContainer({
  withFlexColumn = false,
  children,
  ...restProps
}: AppContainerProps): JSX.Element {
  const classes = useStyles({ withFlexColumn })

  return (
    <Container fixed className={classes.container} {...restProps}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles({
  container: (props: { withFlexColumn: boolean }) =>
    !props.withFlexColumn
      ? {}
      : {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
})
