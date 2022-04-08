import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Step, StepContent, Stepper } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import StageLabel from './components/StageLabel'
import i18n from './i18n'

const Button = dynamic(() => import('@mui/material/Button'))
const TooltipTomorrow = dynamic(() => import('components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'))

const Modal = dynamic(() => import('components/Modal'))

interface StagesProps {
  goal: GoalDto
  forTomorrow: boolean
  completeStage: boolean
}

export default function Stages({ goal, forTomorrow, completeStage }: StagesProps): JSX.Element {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const { day, stages } = goal
  const activeStep = day.stage
  const { buttonTitle } = i18n[locale]

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
                <TooltipTomorrow forTomorrow={forTomorrow}>
                  <Button variant="outlined" color="success" size="small" disabled={forTomorrow} onClick={toggleModal}>
                    {buttonTitle}
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
