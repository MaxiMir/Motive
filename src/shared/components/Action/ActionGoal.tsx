import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface ActionGoalProps {
  name: AppEmojiName
  title: string
  count?: number
  active: boolean
  isLoading?: boolean
  onClick: () => void
}

function ActionGoal({ name, title, count, active, isLoading, onClick }: ActionGoalProps) {
  const formatNumber = useFormatNumber()
  const shownCount = typeof count !== 'number' ? null : formatNumber(count)
  const disabled = active || isLoading

  return (
    <TooltipArrow title={!disabled && title}>
      <Button
        size="small"
        variant="outlined"
        disabled={disabled}
        startIcon={
          isLoading ? <CircularProgress size={18} color="inherit" /> : <AppEmoji name={name} />
        }
        sx={{
          minWidth: 'initial',
          height: 35,
          color: 'common.white',
          borderColor: blue[500],
          ':hover': {
            borderColor: blue[300],
          },
          [`& .${buttonClasses.startIcon}`]: {
            margin: !shownCount ? 0 : undefined,
          },
        }}
        onClick={onClick}
      >
        {shownCount}
      </Button>
    </TooltipArrow>
  )
}

export default ActionGoal
