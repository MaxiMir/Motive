import { FC, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogTitle, DialogProps, backdropClasses } from '@mui/material'
import { styled } from '@mui/system'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const Box = dynamic(() => import('@mui/material/Box'))

interface AppModalProps {
  title: JSX.Element | string
  maxWidth?: DialogProps['maxWidth']
  actions?: JSX.Element[]
  onClose: () => void
}

const AppModal: FC<AppModalProps> = ({ title, actions, maxWidth, children, onClose }) => {
  return (
    <DialogWithBackdrop open fullWidth maxWidth={maxWidth} onClose={onClose}>
      <DialogTitle sx={{ padding: '16px 24px 8px', textAlign: 'center', textTransform: 'uppercase' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: '12px 24px 24px !important' }}>{children}</DialogContent>
      {actions && (
        <DialogActions>
          <Box display="flex" flex={1} justifyContent="space-between" pb={2} px={2}>
            {actions.map((a, key) => (
              <Fragment key={key}>{a}</Fragment>
            ))}
          </Box>
        </DialogActions>
      )}
    </DialogWithBackdrop>
  )
}

const DialogWithBackdrop = styled(Dialog)({
  [`& .${backdropClasses.root}`]: {
    background: 'rgba(34, 34, 34, 0.75)',
    backdropFilter: 'blur(5px)',
  },
})

export default AppModal
