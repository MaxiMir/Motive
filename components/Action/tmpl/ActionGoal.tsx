import { Button, createStyles, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

export interface ActionGoalProps {
  tmpl: 'goal'
  name: AppEmojiName
  title: string
  count?: number
  disabled?: boolean
  onClick: () => void
}

export default function ActionGoal({ name, title, count, disabled, onClick }: ActionGoalProps): JSX.Element {
  const classes = useStyles({ name })
  const countShort = count && numberToShort(count)

  return (
    <Button
      variant="outlined"
      title={title}
      size="small"
      aria-label={title}
      disabled={disabled}
      className={classes.button}
      onClick={onClick}
    >
      <AppBox spacing={1}>
        <AppEmoji name={name} />
        {countShort}
      </AppBox>
    </Button>
  )
}

type UseStylesProps = Pick<ActionGoalProps, 'name'>

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      height: 36.5,
      minWidth: 'initial',
      transition: 'all .2s ease-in-out',
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
    },
  }),
)
