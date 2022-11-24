import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

const ModalGoal = dynamic(() => import('./components/ModalGoal'))

export default function AddGoal() {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const buttonText = formatMessage({ id: 'common.create' })

  const toggleModal = () => setOpen(!open)

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
          sx={(theme) => ({
            minWidth: 'initial',
            padding: 0,
            borderRadius: '50%',
            background: theme.palette.background.default,
          })}
          aria-label={buttonText}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={toggleModal}
        >
          <Box display="flex" justifyContent="center" alignItems="center" width={65} height={65}>
            <AppIcon name="add" />
          </Box>
        </Button>
      </Box>
      <Button
        aria-label={buttonText}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{ padding: '4px', textTransform: 'none' }}
        onClick={toggleModal}
      >
        <Typography variant="caption" sx={{ color: 'creativity.light' }}>
          {buttonText}
        </Typography>
      </Button>
      {open && <ModalGoal onClose={toggleModal} />}
    </Box>
  )
}
