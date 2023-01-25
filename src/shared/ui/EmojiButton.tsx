import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import useFormatNumber from '@shared/lib/hooks/useFormatNumber'
import Emoji, { EmojiName } from '@shared/ui/Emoji'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EmojiButtonProps {
  name: EmojiName
  title: string
  count?: number
  active: boolean
  isLoading?: boolean
  onClick: () => void
}

function EmojiButton({ name, title, count, active, isLoading, onClick }: EmojiButtonProps) {
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
          isLoading ? <CircularProgress size={18} color="inherit" /> : <Emoji name={name} />
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

export default EmojiButton
