import { Button, createStyles, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

export interface ActionGoalProps {
  tmpl: 'goal'
  name: AppEmojiName
  title: string
  active?: boolean
  count?: number
  onClick: () => void
}

export default function ActionGoal({ name, active, title, count, onClick }: ActionGoalProps): JSX.Element {
  const classes = useStyles({ name, active })
  const countShort = !count ? null : numberToShort(count)

  return (
    <Button
      variant="outlined"
      size="small"
      className={classes.button}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      <AppBox spacing={1}>
        <AppEmoji name={name} />
        {countShort}
      </AppBox>
    </Button>
  )
}

type UseStylesProps = Pick<ActionGoalProps, 'name' | 'active'>

const useStyles = makeStyles((theme) => {
  return createStyles({
    button: {
      height: 36.5,
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
