import { Box, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'

interface ActionGoalProps {
  name: AppEmojiName
  title: string
  count?: number
  disabled?: boolean
  onClick: () => void
}

function ActionGoal({ name, title, count, disabled, onClick }: ActionGoalProps) {
  const formatNumber = useFormatNumber()
  const formattedCount = count && formatNumber(count)
  const startIcon = typeof count !== 'number' ? undefined : <AppEmoji name={name} />

  return (
    <Button
      disabled={disabled}
      startIcon={startIcon}
      title={title}
      sx={{
        color: 'common.white',
        borderColor: blue[500],
        '&:hover': {
          borderColor: blue[300],
        },
      }}
      onClick={onClick}
    >
      <Box display="flex" gap={1}>
        {!startIcon && <AppEmoji name={name} />}
        {formattedCount}
      </Box>
    </Button>
  )
}

export default ActionGoal
