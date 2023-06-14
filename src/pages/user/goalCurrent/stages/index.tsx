import { Step, StepContent, Stepper } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { stepConnectorClasses } from '@mui/material/StepConnector'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
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
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const title = !forTomorrow ? '' : formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.done' })

  return (
    <>
      <Stepper
        activeStep={dayStage}
        orientation="vertical"
        sx={{
          padding: 0,
          [`& .${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: indigo.A100,
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
                <TooltipArrow title={title}>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={forTomorrow}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{
                      color: indigo['100'],
                      borderColor: indigo['100'],
                      ':hover': {
                        borderColor: indigo['50'],
                      },
                    }}
                    onClick={toggle}
                  >
                    {buttonText}
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
