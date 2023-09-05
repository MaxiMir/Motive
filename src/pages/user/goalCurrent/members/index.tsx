import { Typography } from '@mui/material'
import Chip, { chipClasses } from '@mui/material/Chip'
import { Box, styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { GoalDto } from 'shared/api'
import { useFormatNumber, useWordDeclination } from 'shared/lib/hooks'

const UserGroup = dynamic(() => import('entities/user').then((m) => m.UserGroup))
type MembersProps = Pick<GoalDto, 'members' | 'lastMembers'>

export function Members({ members, lastMembers }: MembersProps) {
  const name = useWordDeclination('members', members)
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(members)

  return (
    <StyledChip
      label={
        <Box display="flex" alignItems="center" gap={0.5}>
          {members > 0 && <UserGroup users={lastMembers} chip />}
          <Typography variant="caption" color="zen.silent">
            {countAll} {name}
          </Typography>
        </Box>
      }
    />
  )
}

const StyledChip = styled(Chip)({
  [`& .${chipClasses.label}`]: {
    paddingLeft: 3,
  },
})
