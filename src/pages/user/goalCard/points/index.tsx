import { Avatar, Chip, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useFormatNumber, useToggle, useWordDeclination } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const PointsModal = dynamic(() => import('./pointsModal'))

interface PointsProps {
  points: number
  pointsTasks: number
}

export function Points({ points, pointsTasks }: PointsProps) {
  const [open, toggle] = useToggle()
  const name = useWordDeclination('points', points)
  const formatNumber = useFormatNumber()
  const count = formatNumber(points)
  const title = `${count} ${name}`

  return (
    <>
      <StyledChip
        icon={
          <StyledAvatar>
            <Icon name="bolt" fontSize={14} />
          </StyledAvatar>
        }
        label={
          <Typography variant="caption" color="zen.silent">
            {title}
          </Typography>
        }
        onClick={toggle}
      />
      {open && (
        <PointsModal title={title} points={points} pointsTasks={pointsTasks} onClose={toggle} />
      )}
    </>
  )
}

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.grey[400],
}))

const StyledAvatar = styled(Avatar)({
  width: 20,
  height: 20,
  background: `linear-gradient(45deg, ${red[800]}, ${red[300]})`,
})
