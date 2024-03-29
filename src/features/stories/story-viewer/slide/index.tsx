import { Box } from '@mui/material'
import { Story } from 'features/stories/types'
import Image from 'shared/ui/image'

interface SlideProps {
  story: Story
}

export function Slide({ story }: SlideProps) {
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
