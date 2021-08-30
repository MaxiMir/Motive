import { Characteristic } from 'dto'
import { numberToShort, toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

export interface CharacteristicCardGoalProps {
  type: 'goal'
  characteristic: Characteristic | 'runs for days'
  value: number
  color: string
}

const CharacteristicCardGoal = ({ characteristic, value, color }: CharacteristicCardGoalProps): JSX.Element => (
  <AppTooltip title={toUpperFirstChar(characteristic)}>
    <AppBox alignItems="center" spacing={1} width={57}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox>
        <AppTypography variant="subtitle1" component="p" style={{ color }}>
          {numberToShort(value)}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default CharacteristicCardGoal
