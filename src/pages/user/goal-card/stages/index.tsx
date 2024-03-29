import { FormControlLabel, Radio, Box, Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { GoalDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import { Interaction } from '../lib'

const Button = dynamic(() => import('@mui/material/Button'))
const TooltipArrow = dynamic(() => import('shared/ui/tooltip-arrow'))
const UpdateStageModal = dynamic(() => import('features/day/update-stage'))

interface StagesProps {
  goal: GoalDto
  interaction: Interaction
}

function Stages({ goal, interaction }: StagesProps) {
  const { id, day, stages } = goal
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const title = !interaction.forFuture ? '' : formatMessage({ id: 'component.available-later' })
  const buttonText = formatMessage({ id: 'common.done' })
  const completeStage = interaction.ownerControls && goal.stage <= day.stage && interaction.lastDay

  return (
    <>
      <Stack gap={1}>
        {stages.map((stage, index) => (
          <Box display="flex" justifyContent="space-between" alignItems="center" key={stage}>
            <FormControlLabel
              control={<Radio readOnly />}
              label={stage}
              checked={day.stage > index}
              disabled
              sx={{
                color: day.stage > index ? '#308fe8' : 'zen.silent',
              }}
            />
            {completeStage && day.stage === index && (
              <TooltipArrow title={title}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={interaction.forFuture}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  title={buttonText}
                  sx={{ width: 32, minWidth: 'initial' }}
                  onClick={toggle}
                >
                  <Icon name="done" />
                </Button>
              </TooltipArrow>
            )}
          </Box>
        ))}
      </Stack>
      {open && (
        <UpdateStageModal goalId={id} stages={stages} dayStage={day.stage} onClose={toggle} />
      )}
    </>
  )
}

export default Stages
