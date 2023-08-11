import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('shared/ui/Image'))
const Empty = dynamic(() => import('./empty'))

interface CoverProps {
  cover?: string
  avatar: JSX.Element
  top: JSX.Element
  bottom: Array<JSX.Element | null>
}

export function Cover({ cover, avatar, top, bottom }: CoverProps) {
  const height = cover ? 250 : 150

  return (
    <Box position="relative" height={height} mb={3}>
      <AvatarBox>{avatar}</AvatarBox>
      {cover ? (
        <Image src={cover} alt="" fill style={{ objectFit: 'cover' }} />
      ) : (
        <Empty sphere="development" />
      )}
      <TopBox>{top}</TopBox>
      <BottomBox display="flex" gap={1}>
        {bottom.map((element, index) => (
          <Fragment key={index}>{element}</Fragment>
        ))}
      </BottomBox>
    </Box>
  )
}

const AvatarBox = styled(Box)({
  position: 'absolute',
  left: 8,
  bottom: -30,
  zIndex: 1,
})

const TopBox = styled(Box)({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 1,
})

const BottomBox = styled(Box)({
  position: 'absolute',
  right: 8,
  bottom: -17,
  zIndex: 1,
})
