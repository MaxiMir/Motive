import { Step, StepContent, Stepper } from '@mui/material'
import { teal } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import { useGoalContext } from 'entities/goal'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import StageLabel from './components/StageLabel'
import { useMessages } from './hooks/useMessages'

const Button = dynamic(() => import('@mui/material/Button'))
const TooltipArrow = dynamic(() => import('shared/ui/styled/TooltipArrow'))
const StageModal = dynamic(() => import('./components/StageModal'))

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
                <TooltipArrow title={messages.title}>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={forTomorrow}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    startIcon={<Icon name="done_outline" />}
                    sx={{
                      color: teal[600],
                      borderColor: teal[600],
                      ':hover': {
                        borderColor: teal[400],
                      },
                    }}
                    onClick={toggle}
                  >
                    {messages.buttonText}
                  </Button>
                </TooltipArrow>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {open && <StageModal onClose={toggle} />}
    </>
  )
}

export default Stages
