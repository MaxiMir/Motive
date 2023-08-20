import { useFormik } from 'formik'
import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import {
  UserPageDto,
  SphereDto,
  UpdateUserCharacteristicDto,
  updateCharacteristic,
} from 'shared/api'

export function useEditSphereForm(
  userId: number,
  sphere: SphereDto,
  value: number,
  onSuccess: () => void,
) {
  const [page, mutatePage] = useUserPageCache()
  const { mutateAsync } = useMutation(
    (dto: UpdateUserCharacteristicDto) => updateCharacteristic(userId, dto),
    {
      onSuccess(_, request) {
        mutatePage(getNextState(page, request))
      },
    },
  )

  return useFormik<UpdateUserCharacteristicDto>({
    initialValues: {
      sphere,
      value,
    },
    async onSubmit(dto) {
      mutateAsync(dto).then(onSuccess)
    },
  })
}

function getNextState(page: UserPageDto, { sphere, value }: UpdateUserCharacteristicDto) {
  return produce(page, (draft) => {
    draft.characteristic[sphere] = value
  })
}
