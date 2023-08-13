import { FormControlLabel, Radio, Box, Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

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
      <Stack gap={1}>
        {stages.map((stage, index) => (
          <Box display="flex" justifyContent="space-between" alignItems="center" key={stage}>
            <FormControlLabel
              value="female"
              control={<Radio readOnly />}
              label={stage}
              checked={dayStage > index}
              sx={{
                color: dayStage > index ? '#308fe8' : 'zen.silent',
              }}
            />
            {completeStage && dayStage === index && (
              <TooltipArrow title={title}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={forTomorrow}
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
        <UpdateStageModal goalId={goalId} stages={stages} dayStage={dayStage} onClose={toggle} />
      )}
    </>
  )
}

export default Stages
