import { Button, Typography } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface CharacteristicReactionProps {
  title: string
  count?: number
  active: boolean
  isLoading?: boolean
  startIcon: string
  onClick: () => void
}

export function CharacteristicReaction({
  title,
  count,
  active,
  isLoading,
  startIcon,
  onClick,
}: CharacteristicReactionProps) {
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
          isLoading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <Typography paragraph m={0}>
              {startIcon}
            </Typography>
          )
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
