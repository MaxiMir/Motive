import AppTooltip from 'components/UI/AppTooltip'
import AppEmoji from 'components/UI/AppEmoji'

export default function CompletedByOther(): JSX.Element {
  return (
    <AppTooltip title="One of the members has already completed">
      <AppEmoji name="fire" onlyEmoji />
    </AppTooltip>
  )
}
