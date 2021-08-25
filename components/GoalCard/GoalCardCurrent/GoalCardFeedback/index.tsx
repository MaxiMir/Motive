import dynamic from 'next/dynamic'
import { Feedback } from 'dto'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

const GoalCardFeedbackPhoto = dynamic(() => import('./GoalCardFeedbackPhoto'))

export default function GoalCardFeedback({ text, photos, videos }: Feedback): JSX.Element {
  return (
    <AppBox flexDirection="column" spacing={2}>
      <AppTypography>{text || 'Coming soon ...'}</AppTypography>
      <AppBox flexWrap="wrap" spacing={2}>
        {photos?.map((photo) => (
          <GoalCardFeedbackPhoto photo={photo} key={photo} />
        ))}
      </AppBox>
      {videos?.map((photo) => (
        <div key={photo} />
      ))}
    </AppBox>
  )
}
