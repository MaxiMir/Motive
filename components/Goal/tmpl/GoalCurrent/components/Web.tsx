import Image from 'next/image'
import { Box } from '@mui/material'

export default function Web(): JSX.Element {
  return (
    <Box display="flex" position="absolute" right={16} top={48}>
      <Image src="/images/svg/web.svg" alt="Pitt's web" width={211} height={202} priority />
    </Box>
  )
}
