import { Box, Button, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { useMessages } from './hooks/useMessages'

const GoalModal = dynamic(() => import('./components/GoalModal'))

function AddGoal() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <Stack alignItems="center" spacing={1} minWidth={100}>
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
          aria-label={messages.buttonText}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={({ palette }) => ({
            minWidth: 'initial',
            padding: 0,
            borderRadius: '50%',
            background: palette.background.default,
          })}
          onClick={toggle}
        >
          <Box display="flex" justifyContent="center" alignItems="center" width={65} height={65}>
            <Icon name="data_saver_on" />
          </Box>
        </Button>
      </Box>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ padding: '4px' }}
        onClick={toggle}
      >
        <Typography variant="caption" sx={{ color: 'common.white' }}>
          {messages.buttonText}
        </Typography>
      </Button>
      {open && <GoalModal onClose={toggle} />}
    </Stack>
  )
}

export default AddGoal
