import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { UserBaseDto, GoalDto, DayCharacteristicName, OwnershipDto } from 'dto'
import useLocale from 'hooks/useLocale'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'
import { checkOnCompletion } from './helper'

const Join = dynamic(() => import('./components/Join'))
const Completion = dynamic(() => import('./components/Completion'))

export interface ViewerProps {
  goal: GoalDto
  owner: UserBaseDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function Viewer({ goal, owner, forTomorrow, clientOwnership }: ViewerProps): JSX.Element {
  const { locale } = useLocale()
  const completion = checkOnCompletion(clientOwnership, goal)

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      <Box display="flex" gap={1}>
        {(['motivation', 'creativity'] as DayCharacteristicName[]).map((name) => (
          <ReactionWithSend goal={goal} name={name} key={name} locale={locale} />
        ))}
        <ReactionSupport goal={goal} owner={owner} locale={locale} />
      </Box>
      {!clientOwnership.member ? (
        <Join goal={goal} locale={locale} />
      ) : (
        <>{completion && <Completion goal={goal} forTomorrow={forTomorrow} clientMember={clientOwnership.member} />}</>
      )}
    </Box>
  )
}
