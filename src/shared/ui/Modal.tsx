import {
  Dialog,
  DialogContent,
  GlobalStyles,
  DialogTitle,
  IconButton,
  DialogProps,
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
      disableScrollLock
      maxWidth={maxWidth}
      sx={{
        [`& .${backdropClasses.root}`]: {
          background: 'rgba(34, 34, 34, 0.75)',
          backdropFilter: 'blur(5px)',
        },
      }}
      onClose={onClose}
    >
      <DialogTitle
        sx={({ spacing }) => ({
          padding: spacing(2, 3, 1),
          marginX: 6,
          textAlign: 'center',
          textTransform: 'uppercase',
        })}
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
        <Icon name="close" />
      </IconButton>
      <PerfectScrollbar>
        <DialogContent
          sx={{
            height: {
              xs: !staticHeight ? undefined : 600,
              md: !staticHeight ? undefined : 800,
            },
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
