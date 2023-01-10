import Image, { ImageProps } from 'next/image'
import { Box, IconButton, Typography } from '@mui/material'
import { copyText } from '@helpers/navigator'
import useSnackbar from '@hooks/useSnackbar'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

interface WalletProps {
  name: string
  wallet: string
  src: ImageProps['src']
}

function Wallet({ name, wallet, src }: WalletProps) {
  const messages = useMessages()
  const [enqueueSnackbar] = useSnackbar()

  const onSuccess = () => {
    enqueueSnackbar({ message: messages.copiedText, severity: 'success', icon: 'keyboard' })
  }

  const onError = () => {
    enqueueSnackbar({ message: messages.errorText, severity: 'error' })
  }

  const onClick = () => copyText(wallet).then(onSuccess).catch(onError)

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
      <TooltipArrow title={messages.copyText}>
        <IconButton disableFocusRipple onClick={onClick}>
          <AppIcon name="content_copy" />
        </IconButton>
      </TooltipArrow>
    </Box>
  )
}

export default Wallet
