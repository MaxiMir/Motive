import { DayCharacteristicUpdateDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'
import { getFilterParams } from '@shared/lib/helpers'

export const updateCharacteristic = (dto: DayCharacteristicUpdateDto): Promise<void> => {
  const { id, dayId, name, add } = dto
  const params = getFilterParams({ insert: add })

  return fetcher.patch(`/goals/${id}/days/${dayId}/characteristic/${name}`, { id }, { params })
}
