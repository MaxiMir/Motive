import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { Client, Discussion, Role } from 'dto'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'

const GoalCardDiscussionProto = dynamic(() => import('./components/GoalCardDiscussionProto'))
const GoalCardDiscussionContent = dynamic(() => import('./components/GoalCardDiscussionContent'))

interface GoalCardDiscussionProps {
  dayId: string
  client: Client
  role: Role
}

export default function GoalCardDiscussion({ dayId, ...restProps }: GoalCardDiscussionProps): JSX.Element {
  const { data } = useSWR<AxiosResponse<Discussion>>(`discussion${dayId}`, () => DayService.getDiscussion({ dayId }))

  return (
    <AppBox flexDirection="column" spacing={2} width="100%">
      {!data?.data ? (
        new Array(6).fill(<GoalCardDiscussionProto />).map((jsx, key) => <Fragment key={key}>{jsx}</Fragment>)
      ) : (
        <GoalCardDiscussionContent {...restProps} dayId={dayId} discussion={data.data} />
      )}
    </AppBox>
  )
}
