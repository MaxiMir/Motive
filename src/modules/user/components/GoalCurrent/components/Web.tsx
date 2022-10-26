import Image from 'next/legacy/image'
import { Box } from '@mui/material'

export default function Web() {
  return (
    <Box display="flex" position="absolute" top={0} right={32}>
      <Image src="/images/svg/web.svg" alt="" width={151.5} height={157.5} priority />
    </Box>
  )
}
