import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { SPHERE_ICONS, SphereProgress } from 'entities/characteristic'
import { SphereDto } from 'shared/api'

const Edit = dynamic(() => import('./edit'))

interface SphereProps {
  userId: number
  sphere: SphereDto
  value: number
  viewerPage: boolean
}

function Sphere({ userId, sphere, value, viewerPage }: SphereProps) {
  const icon = SPHERE_ICONS[sphere]

  return (
    <Stack gap={1}>
      {viewerPage && <Edit userId={userId} sphere={sphere} icon={icon} value={value} />}
      <SphereProgress sphere={sphere} icon={icon} value={value} compact />
    </Stack>
  )
}

export default Sphere
