import { Box } from '@mui/material'
import { differenceInCalendarDays } from 'date-fns'
import dynamic from 'next/dynamic'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import { SHOW_WEB_AFTER_DAYS } from './consts'
import { ShareDay } from './shareDay'
import { SphereAvatar } from './sphereAvatar'

const Image = dynamic(() => import('shared/ui/Image'))
const MenuEdit = dynamic(() => import('./menuEdit'))
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
  const web = differenceInCalendarDays(today, Date.parse(updated)) >= SHOW_WEB_AFTER_DAYS

  return (
    <Box position="relative" height={210} mb={3}>
      <SphereAvatar sphere={sphere} />
      {cover ? (
        <Image
          src={cover}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 91vw, 41vw"
        />
      ) : (
        <Gradient sphere={sphere} />
      )}
      {viewerPart.all && (
        <Box position="absolute" top={8} right={8}>
          <MenuEdit goalId={id} cover={cover} key="menu" />
        </Box>
      )}
      <Box position="absolute" right={8} bottom={-17} zIndex={1} display="flex" gap={1}>
        <ShareDay goalId={id} dayId={day.id} title={name} key="share" />
        {!viewerPart.goal && <Membership goal={goal} viewerPart={viewerPart} key="member" />}
        {deletion && <Deletion goalId={id} key="deletion" />}
      </Box>
      {web && <Web />}
    </Box>
  )
}
