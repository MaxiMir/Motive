import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Step, StepContent, Stepper } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import StageLabel from './components/StageLabel'
import { useMessages } from './hooks/useMessages'

const Button = dynamic(() => import('@mui/material/Button'))
const Tooltip = dynamic(() => import('@mui/material/Tooltip'))
const ModalStage = dynamic(() => import('./components/ModalStage'))

interface StagesProps {
  forTomorrow: boolean
  completeStage: boolean
}

function Stages({ forTomorrow, completeStage }: StagesProps) {
  const messages = useMessages(forTomorrow)
  const { day, stages } = useGoalContext()
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
          },
        }}
      >
        {stages.map((stage, index) => (
          <Step key={stage}>
            <StageLabel index={index} activeStep={activeStep} stage={stage} />
            {!completeStage ? (
              <StepContent />
            ) : (
              <StepContent>
                <Tooltip title={messages.title} arrow followCursor>
                  <span>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      disabled={forTomorrow}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={toggleModal}
                    >
                      {messages.buttonText}
                    </Button>
                  </span>
                </Tooltip>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {open && <ModalStage onClose={toggleModal} />}
    </>
  )
}

export default Stages
