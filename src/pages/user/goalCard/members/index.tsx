import { Typography } from '@mui/material'
import Chip, { chipClasses } from '@mui/material/Chip'
import { Box, styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { GoalDto } from 'shared/api'
import { useFormatNumber, useWordDeclination } from 'shared/lib/hooks'

const AvatarsGroup = dynamic(() => import('shared/ui/AvatarsGroup'))
type MembersProps = Pick<GoalDto, 'members' | 'lastMembers'>

export function Members({ members, lastMembers }: MembersProps) {
  const name = useWordDeclination('members', members)
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(members)
  const renderGroup = lastMembers && lastMembers?.length > 0

  return (
    <StyledChip
      pinchLeft={renderGroup}
      label={
        <Box display="flex" alignItems="center" gap={0.5}>
          {renderGroup && <AvatarsGroup avatars={lastMembers} size={20} chip />}
          <Typography variant="caption" color="zen.silent">
            {countAll} {name}
          </Typography>
        </Box>
      }
    />
  )
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'pinchLeft',
})<{ pinchLeft?: boolean }>(({ theme: _, pinchLeft }) => ({
  [`& .${chipClasses.label}`]: {
    paddingLeft: pinchLeft ? 3 : undefined,
  },
}))
