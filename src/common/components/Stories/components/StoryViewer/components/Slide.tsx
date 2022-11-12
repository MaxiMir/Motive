import Image from 'next/image'
import { Box } from '@mui/material'
import { getImageSrc } from '@href'

export interface Story {
  id: number
  url: string
  duration?: number
}

export interface SlideProps {
  story: Story
}

export default function Slide({ story }: SlideProps) {
  const { url } = story
  const absoluteSrc = getImageSrc(url)

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
