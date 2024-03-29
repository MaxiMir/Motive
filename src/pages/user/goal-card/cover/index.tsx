import { Box } from '@mui/material'
import { differenceInCalendarDays } from 'date-fns'
import dynamic from 'next/dynamic'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import { ShareDay } from './share-day'
import { SphereAvatar } from './sphere-avatar'

const Image = dynamic(() => import('shared/ui/image'))
const MenuEdit = dynamic(() => import('./menu-edit'))
const Deletion = dynamic(() => import('./deletion'))
const Membership = dynamic(() => import('./membership'))
const Gradient = dynamic(() => import('./gradient'))
const Web = dynamic(() => import('./web'))

interface CoverProps {
  goal: GoalDto
  viewerPart: ViewerPart
}

export function Cover({ goal, viewerPart }: CoverProps) {
  const { id, name, day, cover, sphere, created, updated } = goal
  const today = new Date()
  const deletion = viewerPart.all && !differenceInCalendarDays(today, Date.parse(created))
  const dayDifference = differenceInCalendarDays(today, Date.parse(updated))
  const web = dayDifference >= Number(process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS || '')

  return (
    <Box position="relative" height={250} mb={3}>
      <SphereAvatar sphere={sphere} />
      {!cover ? (
        <Gradient sphere={sphere} />
      ) : (
        <Image
          src={cover}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 91vw, 41vw"
        />
      )}
      {viewerPart.all && (
        <Box position="absolute" top={8} right={8}>
          <MenuEdit goalId={id} cover={cover} />
        </Box>
      )}
      <Box position="absolute" right={8} bottom={-17} zIndex={1} display="flex" gap={1}>
        <ShareDay goalId={id} dayId={day.id} title={name} />
        {!viewerPart.goal && <Membership goal={goal} viewerPart={viewerPart} />}
        {deletion && <Deletion goalId={id} />}
      </Box>
      {web && <Web />}
    </Box>
  )
}
