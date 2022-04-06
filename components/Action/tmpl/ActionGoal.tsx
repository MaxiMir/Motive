import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
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
      <AppBox gap={1}>
        <AppEmoji name={name} />
        {countShort}
      </AppBox>
    </Button>
  )
}

type UseStylesProps = Pick<ActionGoalProps, 'name'>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: 36.5,
      minWidth: 'initial',
      transition: 'all .2s ease-in-out',
      borderColor: (props: UseStylesProps) => {
        switch (props.name) {
          case 'motivation':
            return theme.characteristic.motivation.main
          case 'creativity':
            return theme.characteristic.creativity.main
          case 'support':
            return theme.characteristic.support.main
          default:
            return ''
        }
      },
    },
  }),
)
