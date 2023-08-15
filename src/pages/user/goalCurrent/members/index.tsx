import { Chip, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { GoalDto } from 'shared/api'
import { useFormatNumber, useWordDeclination } from 'shared/lib/hooks'
import { AVATAR_SIZE, AVATAR_OFFSET_PX } from './const'
import { Member } from './member'

type MembersProps = Pick<GoalDto, 'members' | 'lastMembers'>

export function Members({ members, lastMembers }: MembersProps) {
  const name = useWordDeclination('members', members)
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(members)
  const shownCount = lastMembers?.length || 0
  const width = AVATAR_SIZE * shownCount - (shownCount - 1) * AVATAR_OFFSET_PX
  const offset = -(AVATAR_OFFSET_PX / 8)

  return (
    <StyledChip
      label={
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={width}>
            {lastMembers?.map((member, index) => (
              <Member
                member={member}
                count={shownCount}
                offset={offset}
                index={index}
                key={member.id}
              />
            ))}
          </Box>
          <Typography variant="caption" color="zen.silent">
            {countAll} {name}
          </Typography>
        </Box>
      }
    />
  )
}

const StyledChip = withStyles({
  label: {
    paddingLeft: 3,
  },
})(Chip)
