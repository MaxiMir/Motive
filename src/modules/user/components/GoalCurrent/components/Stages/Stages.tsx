import dynamic from 'next/dynamic'
import { Step, StepContent, Stepper } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import useToggle from '@hooks/useToggle'
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
  const [open, toggle] = useToggle()
  const activeStep = day.stage

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
                      onClick={toggle}
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
      {open && <ModalStage onClose={toggle} />}
    </>
  )
}

export default Stages
