import { StepLabel, Typography } from '@mui/material'
import AppIcon from 'src/common/ui/AppIcon'

interface StageLabelProps {
  index: number
  activeStep: number
  stage: string
}

export default function StageLabel({ index, activeStep, stage }: StageLabelProps) {
  const icon = activeStep > index ? 'task_alt' : 'radio_button_unchecked'
  const color = activeStep >= index ? 'zen.wave' : 'zen.silent'

  const stepIconComponent = () => <AppIcon name={icon} />

  return (
    <StepLabel
      StepIconComponent={stepIconComponent}
      optional={<Typography sx={{ color }}>{stage}</Typography>}
      sx={{ color }}
    />
  )
}
