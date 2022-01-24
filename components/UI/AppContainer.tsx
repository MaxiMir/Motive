import clsx from 'clsx'
import { Container, ContainerProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type AppContainerProps = Omit<ContainerProps, 'fixed'> & {
  flexColumn?: boolean
}

export default function AppContainer({
  className,
  flexColumn = false,
  children,
  ...props
}: AppContainerProps): JSX.Element {
  const classes = useStyles({ flexColumn })

  return (
    <Container fixed className={clsx(classes.container, className)} {...props}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles({
  container: (props: { flexColumn: boolean }) =>
    !props.flexColumn
      ? {}
      : {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
})
