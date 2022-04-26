import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

const Typography = dynamic(() => import('@mui/material/Typography'))
const FeedbackButton = dynamic(() => import('./components/FeedbackButton'))

export interface NotAddedProps {
  goal: GoalDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function NotAdded({ goal, forTomorrow, clientOwnership }: NotAddedProps) {
  const { locale } = useLocale()
  const { soon } = i18n[locale]

  return (
    <>
      {!clientOwnership.goal ? (
        <Typography>{soon}</Typography>
      ) : (
        <FeedbackButton goal={goal} forTomorrow={forTomorrow} locale={locale} />
      )}
    </>
  )
}
