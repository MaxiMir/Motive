import { Box, Button, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useMessage, useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const CreateGoal = dynamic(() => import('features/goal/create-goal'))

function AddGoal() {
  const buttonText = useMessage('common.create')
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
          aria-label={buttonText}
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
          {buttonText}
        </Typography>
      </Button>
      {open && <CreateGoal onClose={toggle} />}
    </Stack>
  )
}

export default AddGoal
