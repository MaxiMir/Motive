import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Image, { ImageProps } from 'next/image'
import { copy } from 'shared/lib/helpers'
import Icon from 'shared/ui/Icon'
import { useSnackbar } from 'shared/ui/snackbar'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface WalletProps {
  name: string
  wallet: string
  src: ImageProps['src']
}

export function Wallet({ name, wallet, src }: WalletProps) {
  const { enqueueSnackbar } = useSnackbar()
  const { formatMessage } = useIntl()
  const copyText = formatMessage({ id: 'common.copy' })
  const copiedText = formatMessage({ id: 'common.copied' })
  const errorText = formatMessage({ id: 'common.error' })

  const onSuccess = () => {
    enqueueSnackbar(copiedText, { severity: 'success', icon: '⌨️' })
  }

  const onError = () => {
    enqueueSnackbar(errorText, { severity: 'error', icon: '☠️' })
  }

  const onClick = () => copy(wallet).then(onSuccess).catch(onError)

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Image src={src} alt="" width={32} height={32} />
      <Typography>{name}:</Typography>
      <Box
        alignItems="flex-end"
        height={24}
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <Typography variant="caption" color="zen.silent">
          {wallet}
        </Typography>
      </Box>
      <TooltipArrow title={copyText}>
        <IconButton disableFocusRipple onClick={onClick}>
          <Icon name="content_copy" />
        </IconButton>
      </TooltipArrow>
    </Stack>
  )
}
