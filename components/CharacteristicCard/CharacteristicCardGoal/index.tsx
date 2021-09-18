import { GoalCharacteristic } from 'dto'
import { numberToShort, toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

export interface CharacteristicCardGoalProps {
  type: 'goal'
  characteristic: GoalCharacteristic | 'runs for days'
  value: number
  color: string
}

const CharacteristicCardGoal = ({ characteristic, value, color }: CharacteristicCardGoalProps): JSX.Element => (
  <AppTooltip title={toUpperFirstChar(characteristic)}>
    <AppBox flexDirection="column" alignItems="center" spacing={1} width={40}>
      <AppEmoji name={characteristic} variant="h5" />
      <AppBox>
        <AppTypography component="p" style={{ color }}>
          {numberToShort(value)}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default CharacteristicCardGoal
