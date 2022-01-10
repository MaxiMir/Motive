import dynamic from 'next/dynamic'
import useSWR from 'swr'
import FeedbackService from 'services/FeedbackService'
import AppBox from 'components/UI/AppBox'

const Loader = dynamic(() => import('./components/Loader'))
const Content = dynamic(() => import('./components/Content'))

interface FeedbackProps {
  id: number
}

export default function Feedback({ id }: FeedbackProps): JSX.Element {
  const { data } = useSWR(!id ? null : `feedback-${id}`, () => FeedbackService.getById({ id }))

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} minHeight={180}>
      {!data ? <Loader /> : <Content {...data} />}
    </AppBox>
  )
}
