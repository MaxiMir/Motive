import { Avatar, Chip } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useFormatNumber, useWordDeclination } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

interface PointsProps {
  points: number
}

export function Points({ points }: PointsProps) {
  const name = useWordDeclination('points', points)
  const formatNumber = useFormatNumber()
  const count = formatNumber(points)

  return (
    <StyledChip
      icon={
        <StyledAvatar>
          <Icon name="favorite" fontSize={14} />
        </StyledAvatar>
      }
      label={`${count} ${name}`}
    />
  )
}

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.grey[400],
}))

const StyledAvatar = styled(Avatar)({
  width: 20,
  height: 20,
  background: red[800],
})
