import { Box, Button } from '@mui/material'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'

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

  return (
    <TooltipArrow title={title}>
      <Button
        variant="outlined"
        size="small"
        disabled={disabled}
        sx={{
          minWidth: 'initial',
          transition: 'all .2s ease-in-out',
          borderColor: `${name}.main`,
          color: 'common.white',
          '&:hover': {
            borderColor: `${name}.dark`,
          },
        }}
        onClick={onClick}
      >
        <Box display="flex" gap={1}>
          <AppEmoji name={name} />
          {formattedCount}
        </Box>
      </Button>
    </TooltipArrow>
  )
}

export default ActionGoal
