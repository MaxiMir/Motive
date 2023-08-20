import { useFormik } from 'formik'
import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import {
  UserPageDto,
  SphereDto,
  UpdateUserCharacteristicDto,
  updateCharacteristic,
} from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useEditSphereForm(
  userId: number,
  sphere: SphereDto,
  value: number,
  onSuccess: () => void,
) {
  const { formatMessage } = useIntl()
  const [page, mutatePage] = useUserPageCache()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(
    (dto: UpdateUserCharacteristicDto) => updateCharacteristic(userId, dto),
    {
      onSuccess(_, request) {
        const message = formatMessage({ id: 'common.sphere-updated' })

        flushSync(() => {
          mutatePage(getNextState(page, request))
        })
        enqueueSnackbar(message, { severity: 'success', icon: '🎚️' })
      },
    },
  )

  return useFormik<UpdateUserCharacteristicDto>({
    initialValues: {
      sphere,
      value,
    },
    onSubmit(dto) {
      return mutateAsync(dto).then(onSuccess)
    },
  })
}

function getNextState(page: UserPageDto, { sphere, value }: UpdateUserCharacteristicDto) {
  return produce(page, (draft) => {
    draft.characteristic[sphere] = value
  })
}
