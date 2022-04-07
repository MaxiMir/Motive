import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto, ClientDto } from 'dto'
import useClient from 'hooks/useClient'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import { useDiscussion, useAddMessage } from './hook'

const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const User = dynamic(() => import('components/User'))
const Typography = dynamic(() => import('@mui/material/Typography'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  dayId: number
  owner: UserBaseDto
  count: number
  clientGoal: boolean
}

export default function Discussion({ dayId, owner, count, clientGoal }: DiscussionProps): JSX.Element {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && (!count || !!topics.length) && !clientGoal

  return (
    <AppBox flexDirection="column" gap={2} flex={1} height={524}>
      <>
        {withInput && (
          <User tmpl="input" dayId={dayId} user={client as ClientDto} type={MessageType.QUESTION} onAdd={onAdd} />
        )}
        {!count ? (
          <Typography>Nothing so far...</Typography>
        ) : (
          <>
            {isLoading ? (
              <Loader count={count} withInput={!clientGoal} />
            ) : (
              <>
                <AppList
                  elements={topics}
                  keyGetter={(topic) => topic.id}
                  gap={2}
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
              </>
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
