import React from 'react'
import { createStyles, Step, StepLabel, Stepper, makeStyles } from '@material-ui/core'
import AppIcon from './AppIcon'

interface AppProgressProps {
  steps: string[]
  current: number
}

export default function AppProgress({ steps, current }: AppProgressProps): JSX.Element {
  const classes = useStyles()

  return (
    <Stepper activeStep={current} orientation="vertical" className={classes.root}>
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel StepIconComponent={() => <AppIcon name="circle" />}>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 0,
      '& .MuiStep-root:not(.MuiStep-completed)': {
        '& .MuiStepLabel-label': {
          color: theme.text.silent,
        },
        '& .material-icons': {
          color: theme.text.silent,
        },
      },
      '& .MuiStep-completed': {
        '& .MuiStepLabel-label': {
          color: theme.text.wave,
        },
        '& .material-icons': {
          color: theme.text.wave,
        },
      },
      '& .material-icons': {
        fontSize: '0.875rem',
        marginLeft: 5.7,
      },
      '& .MuiStepConnector-vertical': {
        padding: 0,
      },
      '& .MuiStepConnector-completed': {
        '& .MuiStepConnector-line': {
          borderColor: theme.text.wave,
        },
      },
    },
  }),
)
