import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, UserBaseDto } from 'shared/api'

const TypeSelection = dynamic(() => import('./typeSelection'))
const SupportSign = dynamic(() => import('entities/characteristic').then((m) => m.SupportSign))

interface TopicPanelProps {
  dayId: number
  user: UserBaseDto
  owner: UserBaseDto
  clientGoal: boolean
}

function TopicPanel({ dayId, user, owner, clientGoal }: TopicPanelProps) {
  const { formatMessage } = useIntl()
  const [type, setType] = useState(!clientGoal ? TopicType.Question : TopicType.Support)
  const enterText = formatMessage({ id: 'common.enter-to-send' })
  const withSupportSign = type === TopicType.Support && !clientGoal

  return (
    <Stack width="100%" pt={1} gap={1}>
      <Typography variant="caption" sx={{ color: 'zen.silent', pl: 8 }}>
        {enterText}
      </Typography>
      <CreateTopic
        dayId={dayId}
        user={user}
        type={type}
        startIcon={!withSupportSign ? undefined : <SupportSign name={owner.name} />}
      />
      {!clientGoal && <TypeSelection type={type} setType={setType} />}
    </Stack>
  )
}

export default TopicPanel
