import { Box } from '@mui/material'
import GalleryViewer from '@components/Gallery/GalleryViewer'
import { PhotoDto } from '@dto'

interface GalleryProps {
  photos: PhotoDto[]
}

function Gallery({ photos }: GalleryProps) {
  const compactWidth = photos.length === 1 && photos[0].width < photos[0].height

  return (
    <Box
      sx={{
        width: {
          xs: compactWidth ? 'calc(50% - 0.156rem)' : undefined,
          sm: compactWidth ? 'calc(33.333% - 0.417rem)' : undefined,
        },
      }}
    >
      <GalleryViewer photos={photos} />
    </Box>
  )
}

export default Gallery
