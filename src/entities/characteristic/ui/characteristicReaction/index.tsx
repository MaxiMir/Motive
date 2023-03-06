import { Button, Typography } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
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
        color="inherit"
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
        sx={(theme) => ({
          minWidth: 'initial',
          height: 32,
          borderColor: 'transparent',
          backgroundColor: '#2b2d31',
          color: '#a5a6ac',
          ':hover, :disabled': {
            borderColor: theme.palette.grey[700],
          },
          [`& .${buttonClasses.startIcon}`]: {
            width: !shownCount ? undefined : 18,
            margin: !shownCount ? 0 : undefined,
          },
        })}
        onClick={onClick}
      >
        {shownCount}
      </Button>
    </TooltipArrow>
  )
}
