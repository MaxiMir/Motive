import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { Fragment, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { SphereDto } from 'shared/api'
import { SphereAvatar } from './sphereAvatar'

const Image = dynamic(() => import('shared/ui/Image'))
const Gradient = dynamic(() => import('./gradient'))
const Web = dynamic(() => import('./web'))

interface CoverProps {
  cover?: string
  sphere: SphereDto
  web: boolean
  top: ReactNode
  bottom: Array<ReactNode | null>
}

export function Cover({ cover, sphere, web, top, bottom }: CoverProps) {
  return (
    <Box position="relative" height={210} mb={3}>
      <AvatarBox>
        <SphereAvatar sphere={sphere} />
      </AvatarBox>
      {cover ? (
        <Image src={cover} alt="" fill style={{ objectFit: 'cover' }} />
      ) : (
        <Gradient sphere={sphere} />
      )}
      <TopBox>{top}</TopBox>
      <BottomBox display="flex" gap={1}>
        {bottom.map((element, index) => (
          <Fragment key={index}>{element}</Fragment>
        ))}
      </BottomBox>
      {web && <Web />}
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
