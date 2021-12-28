import { Button, createStyles, makeStyles } from '@material-ui/core'
import { MainCharacteristicName } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

interface ReactionProps {
  name: MainCharacteristicName
  active: boolean
  title: string
  onClick: () => void
}

export default function Reaction({ name, active, title, onClick }: ReactionProps): JSX.Element {
  const classes = useStyles({ name, active })

  return (
    <Button variant="outlined" className={classes.button} title={title} aria-label={title} onClick={onClick}>
      <AppEmoji name={name} variant="h6" className={classes.buttonContent} />
    </Button>
  )
}

type UseStylesProps = Pick<ReactionProps, 'name' | 'active'>

const useStyles = makeStyles((theme) => {
  return createStyles({
    button: {
      width: 36,
      height: 36,
      minWidth: 'initial',
      transition: 'all .2s ease-in-out',
      filter: (props: UseStylesProps) => (props.active ? 'initial' : 'grayscale(1)'),
      borderColor: (props: UseStylesProps) => {
        switch (props.name) {
          case 'motivation':
            return theme.palette.warning.main
          case 'creativity':
            return theme.palette.success.main
          case 'support':
            return theme.palette.info.main
          default:
            return ''
        }
      },
      '&:hover': {
        filter: 'initial',
        background: getBackground,
      },
    },
    buttonContent: {
      width: 20,
    },
  })
})

const getBackground = (props: UseStylesProps): string => {
  switch (props.name) {
    case 'motivation':
      return '#ff980033'
    case 'creativity':
      return '#be99fe4d'
    case 'support':
      return '#00a9f44d'
    default:
      return ''
  }
}
