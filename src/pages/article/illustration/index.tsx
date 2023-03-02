import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Meta } from 'entities/article'

interface IllustrationProps {
  meta: Meta
}

export function Illustration({ meta }: IllustrationProps) {
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
        &#171;{meta.motto}&#187;
      </Typography>
      <Img src={meta.image} alt="" />
    </Box>
  )
}

const Img = styled('img')({
  maxWidth: '100%',
  borderRadius: 3,
})
