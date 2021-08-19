import { Characteristic } from 'dto'
import { toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

export interface CharacteristicGoalProps {
  characteristic: Characteristic | 'runs for days'
  value: number
  color: string
}

const CharacteristicGoal = ({ characteristic, value, color }: CharacteristicGoalProps): JSX.Element => (
  <AppTooltip title={toUpperFirstChar(characteristic)}>
    <AppBox alignItems="center" spacing={1} width={57}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox>
        <AppTypography variant="subtitle1" component="p" style={{ color }}>
          {Math.floor(value)}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default CharacteristicGoal
