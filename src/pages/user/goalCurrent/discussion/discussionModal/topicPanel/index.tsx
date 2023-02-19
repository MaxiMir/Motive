import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, UserBaseDto } from 'shared/api'
import { useDeviceContext } from 'shared/ui/device'

const Typography = dynamic(() => import('@mui/material/Typography'))
const SupportSign = dynamic(() => import('entities/characteristic').then((m) => m.SupportSign))

interface TopicPanelProps {
  dayId: number
  user: UserBaseDto
  owner: UserBaseDto
  clientGoal: boolean
}

function TopicPanel({ dayId, user, owner, clientGoal }: TopicPanelProps) {
  const { formatMessage } = useIntl()
  const device = useDeviceContext()
  const enterText = formatMessage({ id: 'common.enter-to-send' })
  const type = !clientGoal ? TopicType.Question : TopicType.Support
  const withSupportSign = type === TopicType.Support && !clientGoal

  return (
    <Stack width="100%" pt={1} gap={1}>
      {device === 'desktop' && (
        <Typography variant="caption" sx={{ color: 'zen.silent', pl: 8 }}>
          {enterText}
        </Typography>
      )}
      <CreateTopic
        dayId={dayId}
        user={user}
        owner={owner}
        type={type}
        selectingType={!clientGoal}
        startIcon={!withSupportSign ? undefined : <SupportSign name={owner.name} />}
      />
    </Stack>
  )
}

export default TopicPanel
