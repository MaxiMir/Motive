import { Box } from '@mui/material'
import { getImageUrl } from 'helpers/url'

export interface Story {
  id: number
  url: string
  title: string
  started: string
  duration?: number
  end: string
}

export interface SlideProps {
  story: Story
}

export default function Slide({ story }: SlideProps) {
  const { url, title } = story
  const absoluteSrc = getImageUrl(url)

  return (
    <Box
      sx={{
        background: '#000',
      }}
    >
      <img
        src={absoluteSrc}
        alt={title}
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
