import { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { GoalDto } from 'dto'
import { createStyles, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'
import AppTypography from 'components/UI/AppTypography'

const Button = dynamic(() => import('@material-ui/core/Button'))
const TooltipTomorrow = dynamic(() => import('components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'))

const Modal = dynamic(() => import('components/Modal'))

interface AppStagesProps {
  goal: GoalDto
  forTomorrow: boolean
  completeStage: boolean
}

export default function Stages({ goal, forTomorrow, completeStage }: AppStagesProps): JSX.Element {
  const { day, stages } = goal
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const activeStep = day.stage

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.root}>
        {stages.map((stage, index) => (
          <Step key={stage} className={clsx([activeStep >= index ? classes.colored : classes.default])}>
            <StepLabel
              StepIconComponent={() => <AppIcon name={activeStep > index ? 'task_alt' : 'radio_button_unchecked'} />}
              optional={<AppTypography>{stage}</AppTypography>}
            />
            {!completeStage ? (
              <StepContent />
            ) : (
              <StepContent>
                <TooltipTomorrow forTomorrow={forTomorrow}>
                  <Button variant="outlined" size="small" disabled={forTomorrow} onClick={toggleModal}>
                    Complete
                  </Button>
                </TooltipTomorrow>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {open && <Modal tmpl="stage" goal={goal} onClose={toggleModal} />}
    </>
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
