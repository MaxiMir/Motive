import { Tabs } from '@mui/material'
import { UserDetailDto } from 'dto'
import ConfirmationStory from './components/ConfirmationStory'

interface ConfirmationListProps {
  user: UserDetailDto
}

export default function ConfirmationList({ user }: ConfirmationListProps) {
  const { id, name, nickname, avatar, confirmations } = user
  const userBase = { id, name, nickname, avatar }

  return (
    <Tabs
      value={0}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        style: {
          display: 'none',
        },
      }}
    >
      {confirmations.map((confirmation) => (
        <ConfirmationStory user={userBase} confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}
