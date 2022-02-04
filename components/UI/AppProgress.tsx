import React from 'react'
import { createStyles, Step, Stepper, makeStyles } from '@material-ui/core'
import AppStep from './AppStep'

interface AppProgressProps {
  steps: string[]
  current: number
}

export default function AppProgress({ steps, current }: AppProgressProps): JSX.Element {
  const classes = useStyles()

  return (
    <Stepper activeStep={current} orientation="vertical" className={classes.root}>
      {steps.map((step, index) => (
        <Step key={step}>
          <AppStep step={step} current={current === index} completed={current > index} />
        </Step>
      ))}
    </Stepper>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 0,
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
