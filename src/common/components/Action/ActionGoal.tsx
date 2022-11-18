import { Box, Button } from '@mui/material'
import { formatNumber } from '@helpers/intl'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'

interface ActionGoalProps {
  name: AppEmojiName
  title: string
  count?: number
  disabled?: boolean
  onClick: () => void
}

export default function ActionGoal({ name, title, count, disabled, onClick }: ActionGoalProps) {
  const formattedCount = count && formatNumber(count)

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
        {formattedCount}
      </Box>
    </Button>
  )
}
