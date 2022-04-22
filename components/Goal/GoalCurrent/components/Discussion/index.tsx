import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TopicDto, MessageType, UserBaseDto, ClientDto } from 'dto'
import useClient from 'hooks/useClient'
import useLocale from 'hooks/useLocale'
import { AppListProps } from 'components/UI/AppList'
import { useDiscussion, useAddMessage } from './hook'
import i18n from './i18n'

const Typography = dynamic(() => import('@mui/material/Typography'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const UserInput = dynamic(() => import('components/User/UserInput'))
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
  const { locale } = useLocale()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && (!count || !!topics.length) && !clientGoal
  const { nothing } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1} minHeight={130} maxHeight={500}>
      <>
        {withInput && <UserInput dayId={dayId} user={client as ClientDto} type={MessageType.QUESTION} onAdd={onAdd} />}
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
