import fetcher from '@shared/config/fetcher'
import { DayCharacteristicUpdateDto } from '@shared/api/day'
import { getFilterParams } from '@shared/lib/helpers/url'

export const updateCharacteristic = (dto: DayCharacteristicUpdateDto): Promise<void> => {
  const { id, dayId, name, add } = dto
  const params = getFilterParams({ insert: add })

  return fetcher.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
}
