import { Box, Typography } from '@mui/material'

interface WalletAddressProps {
  wallet: string
}

export default function WalletAddress({ wallet }: WalletAddressProps): JSX.Element {
  return (
    <Box display="flex" alignItems="flex-end" height={24}>
      <Typography variant="caption" sx={{ color: 'zen.silent' }}>
        {wallet}
      </Typography>
    </Box>
  )
}
