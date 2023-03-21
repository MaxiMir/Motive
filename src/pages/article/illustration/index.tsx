import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

interface IllustrationProps {
  image: string
  motto: string
}

export function Illustration({ image, motto }: IllustrationProps) {
  return (
    <Box position="relative" mb={3}>
      <Typography
        sx={(theme) => ({
          fontStyle: 'oblique',
          color: {
            xs: theme.palette.grey[600],
            md: 'common.white',
          },
          position: {
            md: 'absolute',
          },
          top: {
            md: 32,
          },
          left: {
            md: 0,
          },
          right: {
            md: 0,
          },
          margin: {
            xs: '0 0 16px',
            md: '0 24px',
          },
          padding: {
            md: '8px',
          },
          textAlign: {
            md: 'center',
          },
          background: {
            md: 'rgba(0, 0, 0, .5)',
          },
          borderRadius: {
            md: 1,
          },
        })}
      >
        &#171;{motto}&#187;
      </Typography>
      <ImgNative src={image} alt="" />
    </Box>
  )
}

const ImgNative = styled('img')({
  maxWidth: '100%',
  borderRadius: 3,
})
