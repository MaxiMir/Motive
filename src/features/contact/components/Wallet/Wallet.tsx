import Image, { ImageProps } from 'next/image'
import { Box, IconButton, Typography } from '@mui/material'
import { copyHandler } from '@helpers/navigator'
import useSnackbar from '@hooks/useSnackbar'
import AppIcon from '@ui/AppIcon'
import useMessages from './hooks/useMessages'

interface WalletProps {
  name: string
  wallet: string
  src: ImageProps['src']
}

function Wallet({ name, wallet, src }: WalletProps) {
  const messages = useMessages()
  const [enqueueSnackbar] = useSnackbar()

  const onCopySuccess = () => {
    enqueueSnackbar({ message: messages.copyText, severity: 'success', icon: 'keyboard' })
  }

  const onCopyError = () => {
    enqueueSnackbar({ message: messages.errorText, severity: 'error' })
  }

  const onClick = () => copyHandler(wallet, onCopySuccess, onCopyError)

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
      <Image src={src} alt="" width={32} height={32} />
      <Typography>{name}:</Typography>
      <Box
        display="flex"
        alignItems="flex-end"
        height={24}
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          {wallet}
        </Typography>
      </Box>
      <IconButton disableFocusRipple sx={{ color: 'zen.silent' }} onClick={onClick}>
        <AppIcon name="content_copy" />
      </IconButton>
    </Box>
  )
}

export default Wallet
