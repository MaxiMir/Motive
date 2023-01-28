import { Box } from '@mui/material'
import Image from 'next/image'
import webSrc from '../public/images/svg/web.svg'

function Web() {
  return (
    <Box position="absolute" top={0} right={32}>
      <Image src={webSrc} alt="" width={151.5} height={157.5} priority />
    </Box>
  )
}

export default Web
