import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { TopicDto, MessageType, UserBaseDto, ClientDto } from 'src/common/dto'
import useClient from 'src/common/hooks/useClient'
import { AppListProps } from 'src/common/ui/AppList'
import { useDiscussion, useAddMessage } from './hook'
import i18n from './i18n'

const Typography = dynamic(() => import('@mui/material/Typography'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const UserInput = dynamic(() => import('@components/User/UserInput'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('src/common/ui/AppList'))

interface DiscussionProps {
  dayId: number
  owner: UserBaseDto
  count: number
  clientGoal: boolean
}

export default function Discussion({ dayId, owner, count, clientGoal }: DiscussionProps) {
  const { locale } = useIntl()
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && (!count || !!topics.length) && !clientGoal
  const minHeight = topics.length || withInput ? 130 : undefined
  const { nothing } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1} minHeight={minHeight} maxHeight={500}>
      <>
        {withInput && <UserInput dayId={dayId} user={client as ClientDto} type={MessageType.Question} onAdd={onAdd} />}
        {!count ? (
          <Typography>{nothing}</Typography>
        ) : (
          <>
            {isLoading ? (
              <Loader count={count} withInput={!clientGoal} />
            ) : (
              <AppList
                elements={topics}
                keyGetter={(topic) => topic.id}
                gap={2}
                pb={2}
                render={(topic, index) => (
                  <Topic
                    topic={topic}
                    owner={owner}
                    isOwner={clientGoal}
                    inView={checkOnLoadMore(index)}
                    onView={fetchNextPage}
                    onAdd={onAdd}
                  />
                )}
              />
            )}
          </>
        )}
      </>
    </Box>
  )
}
