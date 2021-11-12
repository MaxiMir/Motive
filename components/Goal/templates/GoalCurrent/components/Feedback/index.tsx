import dynamic from 'next/dynamic'
import useSWR from 'swr'
import DayService from 'services/DayService'
import AppBox from 'components/UI/AppBox'

const Loader = dynamic(() => import('./components/Loader'))
const Content = dynamic(() => import('./components/Content'))

interface FeedbackProps {
  dayId: string
}

export default function Feedback({ dayId }: FeedbackProps): JSX.Element {
  const { data } = useSWR(`feedback-${dayId}`, () => DayService.getFeedback({ dayId }))

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} minHeight={180}>
      {!data?.data ? <Loader /> : <Content {...data.data} />}
    </AppBox>
  )
}
