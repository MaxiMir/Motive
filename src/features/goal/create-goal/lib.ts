import { useIntl } from 'react-intl'
import { SPHERE_ICONS } from 'entities/characteristic'
import { SPHERES } from 'shared/api'

export function useSpheresList() {
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'common.sphere-of-life' })
  const list = SPHERES.map((sphere) => ({
    icon: SPHERE_ICONS[sphere],
    name: formatMessage({ id: `common.${sphere}` }),
    value: sphere,
  }))

  return { label, list }
}
