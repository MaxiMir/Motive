import { StepLabel, Typography } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'

interface StageLabelProps {
  index: number
  activeStep: number
  stage: string
}

export default function StageLabel({ index, activeStep, stage }: StageLabelProps): JSX.Element {
  const icon = activeStep > index ? 'task_alt' : 'radio_button_unchecked'
  const color = activeStep >= index ? 'zen.wave' : 'zen.silent'

  return (
    <StepLabel
      StepIconComponent={() => <AppIcon name={icon} />}
      optional={<Typography sx={{ color }}>{stage}</Typography>}
      sx={{ color }}
    />
  )
}
