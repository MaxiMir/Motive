import { Box, Button } from '@mui/material'
import { numberToShort } from 'helpers/prepare'
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
  const countShort = count && numberToShort(count)

  return (
    <Button
      variant="outlined"
      title={title}
      size="small"
      aria-label={title}
      disabled={disabled}
      sx={{
        height: 36.5,
        minWidth: 'initial',
        transition: 'all .2s ease-in-out',
        borderColor: `${name}.main`,
        color: 'common.white',
      }}
      onClick={onClick}
    >
      <Box display="flex" gap={1}>
        <AppEmoji name={name} />
        {countShort}
      </Box>
    </Button>
  )
}
