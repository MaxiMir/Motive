import Image from 'next/image'
import { Typography } from '@mui/material'
import i18n from 'constants/i18n'
import { copyHandler } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppIconButton from 'components/UI/AppIconButton'

interface WalletProps {
  name: string
  wallet: string
}

export default function Wallet({ name, wallet }: WalletProps): JSX.Element {
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const { copy, error } = i18n[locale]
  const onCopySuccess = () => enqueueSnackbar({ message: copy, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: error, severity: 'error' })

  const onClick = () => copyHandler(wallet, onCopySuccess, onCopyError)

  return (
    <AppBox flexWrap="wrap" alignItems="center" gap={1}>
      <Image src={`/images/svg/${name}.svg`} alt="" width={32} height={32} />
      <Typography>{name}:</Typography>
      <AppBox
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
      </AppBox>
      <AppIconButton name="content_copy" sx={{ color: 'zen.silent' }} onClick={onClick} />
    </AppBox>
  )
}
