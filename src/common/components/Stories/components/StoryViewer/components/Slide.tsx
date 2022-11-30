import Image from 'next/image'
import { Box } from '@mui/material'
import { getImageSrc } from '@href'
import { Story } from '@components/Stories/types'

interface SlideProps {
  story: Story
}

function Slide({ story }: SlideProps) {
  const { src } = story
  const absoluteSrc = getImageSrc(src)

  return (
    <Box
      sx={{
        background: '#000',
      }}
    >
      <Image
        src={absoluteSrc}
        alt=""
        fill
        priority
        objectFit="contain"
        draggable={false}
        style={{
          position: 'absolute',
          left: '50%',
          height: '100%',
          transform: 'translateX(-50%)',
          margin: 'auto',
        }}
      />
    </Box>
  )
}

export default Slide
