import { Box, Button, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const CreateGoalModal = dynamic(() => import('features/goal/create-goal'))

function CreateGoal() {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.create' })

  return (
    <Stack alignItems="center" gap={1} minWidth={100}>
      <Box
        padding="2px"
        borderRadius="50%"
        sx={({ palette }) => ({
          background: `linear-gradient(to top left, ${palette.creativity.dark}, ${palette.support.dark})`,
        })}
      >
        <Button
          size="small"
          variant="text"
          color="primary"
          aria-label={buttonText}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={(theme) => ({
            minWidth: 'initial',
            padding: 0,
            borderRadius: '50%',
            background: theme.palette.background.default,
          })}
          onClick={toggle}
        >
          <Box display="flex" justifyContent="center" alignItems="center" width={65} height={65}>
            <Icon name="science" />
          </Box>
        </Button>
      </Box>
      <Button
        color="inherit"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ padding: '4px' }}
        onClick={toggle}
      >
        <Typography variant="caption">{buttonText}</Typography>
      </Button>
      {open && <CreateGoalModal onClose={toggle} />}
    </Stack>
  )
}

export default CreateGoal
