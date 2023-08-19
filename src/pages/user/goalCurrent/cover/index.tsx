import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { differenceInCalendarDays } from 'date-fns'
import dynamic from 'next/dynamic'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import { Interaction } from '../lib'
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
  interaction: Interaction
  viewerPart: ViewerPart
}

export function Cover({ goal, interaction, viewerPart }: CoverProps) {
  const { id, name, day, cover, sphere, started } = goal
  const deletion = viewerPart.all && !differenceInCalendarDays(new Date(), Date.parse(started))
  const web = interaction.lastDay && interaction.daysGone >= SHOW_WEB_AFTER_DAYS

  return (
    <Box position="relative" height={210} mb={3}>
      <SphereAvatar sphere={sphere} />
      {cover ? (
        <Image src={cover} alt="" fill style={{ objectFit: 'cover' }} />
      ) : (
        <Gradient sphere={sphere} />
      )}
      <BottomBox display="flex" gap={1}>
        {viewerPart.all && <MenuEdit goalId={id} cover={cover} key="menu" />}
        <ShareDay goalId={id} dayId={day.id} title={name} key="share" />
        {!viewerPart.goal && <Membership goal={goal} viewerPart={viewerPart} key="member" />}
        {deletion && <Deletion goalId={id} key="deletion" />}
      </BottomBox>
      {web && <Web />}
    </Box>
  )
}

const BottomBox = styled(Box)({
  position: 'absolute',
  right: 8,
  bottom: -17,
  zIndex: 1,
})
