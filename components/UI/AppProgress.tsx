import React from 'react'
import dynamic from 'next/dynamic'
import { createStyles, Step, Stepper, makeStyles, StepLabel, StepContent } from '@material-ui/core'
import clsx from 'clsx'
import AppTypography from './AppTypography'
import AppIcon from './AppIcon'

const Button = dynamic(() => import('@material-ui/core/Button'))

interface AppProgressProps {
  steps: string[]
  current: number
  onComplete?: () => void
}

export default function AppProgress({ steps, current, onComplete }: AppProgressProps): JSX.Element {
  const classes = useStyles()

  return (
    <Stepper activeStep={current} orientation="vertical" className={classes.root}>
      {steps.map((step, index) => (
        <Step key={step} className={clsx([current >= index ? classes.colored : classes.default])}>
          <StepLabel
            StepIconComponent={() => <AppIcon name={current > index ? 'task_alt' : 'radio_button_unchecked'} />}
            optional={<AppTypography>{step}</AppTypography>}
          />
          {!onComplete ? (
            <StepContent />
          ) : (
            <StepContent>
              <Button variant="outlined" size="small" onClick={onComplete}>
                Complete
              </Button>
            </StepContent>
          )}
        </Step>
      ))}
    </Stepper>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 0,
      '& .MuiStepConnector-completed': {
        '& .MuiStepConnector-line': {
          borderColor: theme.text.wave,
        },
      },
    },
    default: {
      color: theme.text.silent,
    },
    colored: {
      color: theme.text.wave,
    },
  }),
)
