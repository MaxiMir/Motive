import { Box } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
// eslint-disable-next-line import/no-internal-modules
import webSrc from 'public/images/svg/web.svg'

function Web() {
  return (
    <StyledBox display="flex" justifyContent="center" alignItems="center">
      <Image src={webSrc} alt="" width={196} height={204} />
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 250,
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  pointerEvents: 'none',
})

export default Web
