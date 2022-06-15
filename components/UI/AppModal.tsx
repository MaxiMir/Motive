import { Fragment, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogTitle, DialogProps, backdropClasses, paperClasses } from '@mui/material'
import AppScrollbar from './AppScrollbar'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const Box = dynamic(() => import('@mui/material/Box'))

interface AppModalProps {
  title: JSX.Element | string
  maxWidth?: DialogProps['maxWidth']
  actions?: JSX.Element[]
  blur?: boolean
  children: ReactNode
  onClose: () => void
}

export default function AppModal({ title, actions, maxWidth, blur = true, children, onClose }: AppModalProps) {
  return (
    <Dialog
      open
      maxWidth={maxWidth}
      sx={{
        [`& .${paperClasses.root}`]: {
          maxHeight: '80vh',
        },
        [`& .${backdropClasses.root}`]: {
          background: 'rgba(34, 34, 34, 0.75)',
          backdropFilter: blur ? 'blur(5px)' : undefined,
        },
      }}
      onClose={onClose}
    >
      <DialogTitle sx={{ padding: '16px 24px 8px', textAlign: 'center', textTransform: 'uppercase' }}>
        {title}
      </DialogTitle>
      <AppScrollbar>
        <DialogContent sx={{ padding: '12px 24px 24px !important' }}>{children}</DialogContent>
      </AppScrollbar>
      {actions && (
        <DialogActions>
          <Box display="flex" flex={1} justifyContent="space-between" pb={2} px={2}>
            {actions.map((a, key) => (
              <Fragment key={key}>{a}</Fragment>
            ))}
          </Box>
        </DialogActions>
      )}
    </Dialog>
  )
}
