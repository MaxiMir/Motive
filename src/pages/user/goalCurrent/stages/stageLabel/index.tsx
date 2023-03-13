import { StepLabel, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import Icon from 'shared/ui/Icon'

interface StageLabelProps {
  index: number
  activeStep: number
  stage: string
}

export function StageLabel({ index, activeStep, stage }: StageLabelProps) {
  const icon = activeStep > index ? 'task_alt' : 'radio_button_unchecked'
  const color = activeStep >= index ? indigo[400] : 'zen.silent'

  const stepIconComponent = () => <Icon name={icon} />

  return (
    <StepLabel
      StepIconComponent={stepIconComponent}
      optional={<Typography sx={{ color }}>{stage}</Typography>}
      sx={{ color }}
    />
  )
}
