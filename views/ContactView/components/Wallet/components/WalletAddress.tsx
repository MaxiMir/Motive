import { Typography } from '@mui/material'
import AppBox from 'components/UI/AppBox'

interface WalletAddressProps {
  wallet: string
}

export default function WalletAddress({ wallet }: WalletAddressProps): JSX.Element {
  return (
    <AppBox alignItems="flex-end" height={24}>
      <Typography variant="caption" sx={{ color: 'zen.silent' }}>
        {wallet}
      </Typography>
    </AppBox>
  )
}
