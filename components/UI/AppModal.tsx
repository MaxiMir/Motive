import { FC, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { styled } from '@mui/system'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const AppBox = dynamic(() => import('./AppBox'))

interface AppModalProps {
  title: JSX.Element | string
  maxWidth?: DialogProps['maxWidth']
  actions?: JSX.Element[]
  onClose: () => void
}

const AppModal: FC<AppModalProps> = ({ title, actions, maxWidth, children, onClose }) => {
  return (
    <DialogWithBackdrop
      open
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '&.MuiBackdrop': {
          background: 'rgba(34, 34, 34, 0.75)',
          backdropFilter: 'blur(10px)',
        },
      }}
      onClose={onClose}
    >
      <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>{title}</DialogTitle>
      <DialogContent sx={{ padding: '12px 24px 24px !important' }}>{children}</DialogContent>
      {actions && (
        <DialogActions>
          <AppBox flex={1} justifyContent="space-between" pb={2} px={2}>
            {actions.map((a, key) => (
              <Fragment key={key}>{a}</Fragment>
            ))}
          </AppBox>
        </DialogActions>
      )}
    </DialogWithBackdrop>
  )
}

const DialogWithBackdrop = styled(Dialog)({
  '& .MuiBackdrop-root': {
    background: 'rgba(34, 34, 34, 0.75)',
    backdropFilter: 'blur(10px)',
  },
})

export default AppModal
