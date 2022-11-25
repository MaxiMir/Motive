import Image from 'next/image'
import { Box } from '@mui/material'
import webSrc from 'public/images/svg/web.svg'

export default function Web() {
  return (
    <Box display="flex" position="absolute" top={0} right={32}>
      <Image src={webSrc} alt="" width={151.5} height={157.5} priority />
    </Box>
  )
}
