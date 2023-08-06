import { Button, Typography } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
import dynamic from 'next/dynamic'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface DayActProps {
  title: string
  count?: number
  active?: boolean
  isLoading?: boolean
  startIcon: string
  onClick: () => void
}

export function DayAct({ title, count, active, isLoading, startIcon, onClick }: DayActProps) {
  const formatNumber = useFormatNumber()
  const shownCount = typeof count !== 'number' ? null : formatNumber(count)

  return (
    <TooltipArrow title={title}>
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        disabled={isLoading}
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
          backgroundColor: '#2b2d31',
          borderColor: active ? theme.palette.grey[700] : 'transparent',
          color: '#a5a6ac',
          ':hover': {
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
