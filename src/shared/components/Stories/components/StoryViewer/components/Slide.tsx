import { Box } from '@mui/material'
import { Story } from '@components/Stories/types'
import Image from '@ui/Image'

interface SlideProps {
  story: Story
}

function Slide({ story }: SlideProps) {
  const { src } = story

  return (
    <Box
      sx={{
        background: '#000',
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        objectFit="contain"
        style={{
          position: 'absolute',
          left: '50%',
          height: '100%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          margin: 'auto',
        }}
      />
    </Box>
  )
}

export default Slide
