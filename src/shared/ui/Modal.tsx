import {
  Dialog,
  DialogContent,
  GlobalStyles,
  DialogProps,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
} from '@mui/material'
import { backdropClasses } from '@mui/material/Backdrop'
import { Fragment, ReactNode } from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const Stack = dynamic(() => import('@mui/material/Stack'))

interface ModalProps extends Pick<DialogProps, 'maxWidth'> {
  title: JSX.Element | string
  actions?: JSX.Element[]
  children: ReactNode
  staticHeight?: boolean
  onClose: () => void
}

function Modal({ title, actions, children, maxWidth, staticHeight, onClose }: ModalProps) {
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })

  return (
    <Dialog
      open
      maxWidth={maxWidth}
      sx={{
        [`& .${backdropClasses.root}`]: {
          background: 'rgba(34, 34, 34, 0.75)',
          backdropFilter: 'blur(5px)',
        },
      }}
      onClose={onClose}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <IconButton edge="start" color="inherit" aria-label={closeText} onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <PerfectScrollbar>
        <DialogContent
          dividers
          sx={{
            height: !staticHeight ? undefined : 600,
          }}
        >
          {children}
        </DialogContent>
      </PerfectScrollbar>
      {actions && (
        <DialogActions>
          <Stack direction="row" justifyContent="space-between" flex={1} pb={2} px={2}>
            {actions.map((a, index) => (
              <Fragment key={index}>{a}</Fragment>
            ))}
          </Stack>
        </DialogActions>
      )}
      <GlobalStyles
        styles={{
          html: {
            overflow: 'hidden',
          },
        }}
      />
    </Dialog>
  )
}

export default Modal
