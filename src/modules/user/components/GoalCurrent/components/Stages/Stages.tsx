import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Step, StepContent, Stepper } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import StageLabel from './components/StageLabel'

const Button = dynamic(() => import('@mui/material/Button'))
const Tooltip = dynamic(() => import('@mui/material/Tooltip'))

const ModalStage = dynamic(() => import('./components/ModalStage'))

interface StagesProps {
  forTomorrow: boolean
  completeStage: boolean
}

function Stages({ forTomorrow, completeStage }: StagesProps) {
  const { formatMessage } = useIntl()
  const { day, stages } = useGoalContext()
  const [open, setOpen] = useState(false)
  const activeStep = day.stage
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.done' })

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
                <Tooltip title={title} arrow followCursor>
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
                      {buttonText}
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
