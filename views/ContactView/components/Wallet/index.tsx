import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import i18nCommon from 'constants/i18n'
import { copyHandler } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import AppIconButton from 'components/ui/AppIconButton'

interface WalletProps {
  name: string
  wallet: string
}

export default function Wallet({ name, wallet }: WalletProps) {
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const { copy, error } = i18nCommon[locale]

  const onCopySuccess = () => enqueueSnackbar({ message: copy, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: error, severity: 'error' })

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
