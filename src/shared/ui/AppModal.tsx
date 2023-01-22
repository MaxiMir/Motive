import { Fragment, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import {
  Dialog,
  DialogContent,
  GlobalStyles,
  DialogTitle,
  IconButton,
  DialogProps,
} from '@mui/material'
import { backdropClasses } from '@mui/material/Backdrop'
import AppScrollbar from '@ui/AppScrollbar'
import AppIcon from '@ui/AppIcon'

const DialogActions = dynamic(() => import('@mui/material/DialogActions'))
const Stack = dynamic(() => import('@mui/material/Stack'))

interface AppModalProps extends Pick<DialogProps, 'maxWidth' | 'PaperProps'> {
  title: JSX.Element | string
  actions?: JSX.Element[]
  children: ReactNode
  onClose: () => void
}

function AppModal({ title, actions, children, maxWidth, PaperProps, onClose }: AppModalProps) {
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })

  return (
    <Dialog
      open
      disableScrollLock
      maxWidth={maxWidth}
      PaperProps={PaperProps}
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
        <AppIcon name="close" />
      </IconButton>
      <AppScrollbar>
        <DialogContent>{children}</DialogContent>
      </AppScrollbar>
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
          '#__next': {
            overflow: 'hidden',
          },
        }}
      />
    </Dialog>
  )
}

export default AppModal
