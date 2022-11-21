import Image from 'next/image'
import { Box } from '@mui/material'
import { getImageSrc } from '@href'

export interface Story {
  src: string
  duration?: number
}

interface SlideProps {
  story: Story
}

export default function Slide({ story }: SlideProps) {
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
