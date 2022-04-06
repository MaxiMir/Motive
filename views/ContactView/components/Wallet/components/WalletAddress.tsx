import { Typography, useTheme } from '@mui/material'
import AppBox from 'components/UI/AppBox'

interface WalletAddressProps {
  wallet: string
}

export default function WalletAddress({ wallet }: WalletAddressProps): JSX.Element {
  const theme = useTheme()

  return (
    <AppBox alignItems="flex-end" height={24}>
      <Typography variant="caption" sx={{ color: theme.text.silent }}>
        {wallet}
      </Typography>
    </AppBox>
  )
}
