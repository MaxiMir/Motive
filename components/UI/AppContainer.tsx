import { Container, ContainerProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type AppContainerProps = Omit<ContainerProps, 'fixed'> & {
  withFlexColumn?: boolean
}

const AppContainer = ({
  withFlexColumn = false,
  children,
  ...restProps
}: AppContainerProps) => {
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

export default AppContainer
