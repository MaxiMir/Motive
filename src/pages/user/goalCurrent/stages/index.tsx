import { Step, StepContent, Stepper } from '@mui/material'
import { teal } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { useMessages } from './lib'
import { StageLabel } from './stageLabel'

const Button = dynamic(() => import('@mui/material/Button'))
const TooltipArrow = dynamic(() => import('shared/ui/TooltipArrow'))
const UpdateStageModal = dynamic(() => import('features/day/update-stage'))

interface StagesProps {
  goalId: number
  stages: string[]
  dayStage: number
  completeStage: boolean
  forTomorrow: boolean
}

function Stages({ goalId, stages, dayStage, forTomorrow, completeStage }: StagesProps) {
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <Stepper
        activeStep={dayStage}
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
            <StageLabel index={index} activeStep={dayStage} stage={stage} />
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
      {open && (
        <UpdateStageModal goalId={goalId} stages={stages} dayStage={dayStage} onClose={toggle} />
      )}
    </>
  )
}

export default Stages
