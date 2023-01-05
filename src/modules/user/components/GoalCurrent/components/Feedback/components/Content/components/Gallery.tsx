import { Box } from '@mui/material'
import { PhotoDto } from '@features/feedback'
import GalleryViewer from '@components/Gallery/GalleryViewer'

interface GalleryProps {
  photos: PhotoDto[]
}

function Gallery({ photos }: GalleryProps) {
  const compactWidth = photos.length === 1 && photos[0].width < photos[0].height

  return (
    <Box sx={{ width: compactWidth ? 'calc(50% - 2.5px)' : undefined }}>
      <GalleryViewer photos={photos} />
    </Box>
  )
}

export default Gallery
