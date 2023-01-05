import { Fragment, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  GlobalStyles,
  DialogProps,
  IconButton,
} from '@mui/material'
import { backdropClasses } from '@mui/material/Backdrop'
import AppScrollbar from '@ui/AppScrollbar'
import AppIcon from '@ui/AppIcon'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const Box = dynamic(() => import('@mui/material/Box'))

interface AppModalProps {
  title: JSX.Element | string
  maxWidth?: DialogProps['maxWidth']
  actions?: JSX.Element[]
  children: ReactNode
  onClose: () => void
}

function AppModal({ title, actions, maxWidth, children, onClose }: AppModalProps) {
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })

  return (
    <Dialog
      open
      maxWidth={maxWidth}
      sx={{
        [`& .${backdropClasses.root}`]: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
        },
      }}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          padding: '16px 24px 8px',
          marginX: 6,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </DialogTitle>
      <IconButton
        aria-label={closeText}
        edge="start"
        sx={{
          position: 'absolute',
          top: 10,
          right: 13,
          color: 'zen.silent',
        }}
        onClick={onClose}
      >
        <AppIcon name="close" />
      </IconButton>
      <AppScrollbar>
        <DialogContent>{children}</DialogContent>
      </AppScrollbar>
      {actions && (
        <DialogActions>
          <Box display="flex" flex={1} justifyContent="space-between" pb={2} px={2}>
            {actions.map((a, index) => (
              <Fragment key={index}>{a}</Fragment>
            ))}
          </Box>
        </DialogActions>
      )}
      <GlobalStyles
        styles={{
          '#__next': {
            overflow: 'hidden',
          },
        }}
      />
    </Dialog>
  )
}

export default AppModal
