import { Box } from '@mui/material'
import GalleryViewer from '@components/Gallery/GalleryViewer'
import { PhotoDto } from 'src/common/dto'

interface GalleryProps {
  photos: PhotoDto[]
}

export default function Gallery({ photos }: GalleryProps) {
  const compactWidth = photos.length === 1 && photos[0].width < photos[0].height

  return (
    <Box
      sx={{
        width: {
          xs: compactWidth ? 'calc(50% - 2.5px)' : undefined,
          sm: compactWidth ? 'calc(33.333% - 6.6666px)' : undefined,
        },
      }}
    >
      <GalleryViewer photos={photos} />
    </Box>
  )
}
