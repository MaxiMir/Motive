import { StepLabel, Typography } from '@mui/material'
import Icon from '@ui/Icon'

interface StageLabelProps {
  index: number
  activeStep: number
  stage: string
}

function StageLabel({ index, activeStep, stage }: StageLabelProps) {
  const icon = activeStep > index ? 'task_alt' : 'radio_button_unchecked'
  const color = activeStep >= index ? 'zen.wave' : 'zen.silent'

  const stepIconComponent = () => <Icon name={icon} />

  return (
    <StepLabel
      StepIconComponent={stepIconComponent}
      optional={<Typography sx={{ color }}>{stage}</Typography>}
      sx={{ color }}
    />
  )
}

export default StageLabel
