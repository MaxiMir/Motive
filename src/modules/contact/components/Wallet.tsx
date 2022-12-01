import Image, { ImageProps } from 'next/image'
import { useIntl } from 'react-intl'
import { Box, IconButton, Typography } from '@mui/material'
import { copyHandler } from '@helpers/window'
import useSnackbar from '@hooks/useSnackbar'
import AppIcon from '@ui/AppIcon'

interface WalletProps {
  name: string
  wallet: string
  src: ImageProps['src']
}

function Wallet({ name, wallet, src }: WalletProps) {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const copyText = formatMessage({ id: 'common.copied' })
  const errorText = formatMessage({ id: 'common.error' })

  const onCopySuccess = () => enqueueSnackbar({ message: copyText, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: errorText, severity: 'error' })

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
