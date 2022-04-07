import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto } from 'dto'
import { Step, StepContent, Stepper, Typography, StepLabel } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'

const Button = dynamic(() => import('@mui/material/Button'))
const TooltipTomorrow = dynamic(() => import('components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'))

const Modal = dynamic(() => import('components/Modal'))

interface AppStagesProps {
  goal: GoalDto
  forTomorrow: boolean
  completeStage: boolean
}

export default function Stages({ goal, forTomorrow, completeStage }: AppStagesProps): JSX.Element {
  const { day, stages } = goal
  const [open, setOpen] = useState(false)
  const activeStep = day.stage

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          padding: 0,
          '& .Mui-completed': {
            '& .MuiStepConnector-line': {
              borderColor: 'zen.wave',
            },
            '& .MuiTypography-root': {
              color: 'zen.wave',
            },
          },
        }}
      >
        {stages.map((stage, index) => (
          <Step key={stage} sx={{ color: activeStep >= index ? 'zen.wave' : 'zen.silent' }}>
            <StepLabel
              StepIconComponent={() => <AppIcon name={activeStep > index ? 'task_alt' : 'radio_button_unchecked'} />}
              optional={<Typography>{stage}</Typography>}
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
