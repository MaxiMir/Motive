import dynamic from 'next/dynamic'
import { Box, Button, Typography } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const GoalModal = dynamic(() => import('./components/GoalModal'))

function AddGoal() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minWidth={100} gap={1}>
      <Box
        sx={(theme) => ({
          padding: '2px',
          background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
          borderRadius: '50%',
        })}
      >
        <Button
          variant="text"
          color="primary"
          size="small"
          aria-label={messages.buttonText}
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
            <AppIcon name="data_saver_on" sx={{ fontSize: 40 }} />
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
    </Box>
  )
}

export default AddGoal
