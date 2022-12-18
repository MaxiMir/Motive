import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { getUserHref } from '@features/user'
import UserLink from '@components/User/UserLink'
import { useMessages } from './hooks/useMessages'

function Inheritance() {
  const messages = useMessages()
  const { owner } = useGoalContext()
  const { name, nickname, avatar } = owner
  const href = getUserHref(nickname)

  return (
    <InheritanceBox display="flex" justifyContent="center" pl={1}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="caption">
          <b>{messages.title}</b>
        </Typography>
        <UserLink name={name} avatar={avatar} href={href} />
      </Box>
    </InheritanceBox>
  )
}

const InheritanceBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -19,
  left: '50%',
  transform: 'translateX(-50%)',
  borderRadius: '1.25rem',
  background: `linear-gradient(90deg, ${theme.palette.support.dark} 0%, ${theme.palette.creativity.dark} 100%)`,
}))

export default Inheritance
