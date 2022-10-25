import Image from 'next/image'
import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { copyHandler } from 'src/common/helpers/dom'
import useSnackbar from 'src/common/hooks/useSnackbar'
import AppIconButton from 'src/common/ui/AppIconButton'

interface WalletProps {
  name: string
  wallet: string
}

export default function Wallet({ name, wallet }: WalletProps) {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const copyText = formatMessage({ id: 'common.copied' })
  const errorText = formatMessage({ id: 'common.error' })

  const onCopySuccess = () => enqueueSnackbar({ message: copyText, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: errorText, severity: 'error' })

  const onClick = () => copyHandler(wallet, onCopySuccess, onCopyError)

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
      <Image src={`/images/svg/${name}.svg`} alt="" width={32} height={32} />
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
      <AppIconButton name="content_copy" sx={{ color: 'zen.silent' }} onClick={onClick} />
    </Box>
  )
}
