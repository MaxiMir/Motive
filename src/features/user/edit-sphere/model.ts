import { useFormik } from 'formik'
import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserPageDto, SphereDto, UpdateCharacteristicDto, updateCharacteristic } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useEditSphereForm(
  userId: number,
  name: SphereDto,
  value: number,
  onSuccess: () => void,
) {
  const { formatMessage } = useIntl()
  const [page, mutatePage] = useUserPageCache()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(
    (dto: UpdateCharacteristicDto) => updateCharacteristic(userId, dto),
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

  return useFormik<UpdateCharacteristicDto>({
    initialValues: {
      name,
      value,
    },
    onSubmit(dto) {
      return mutateAsync(dto).then(onSuccess)
    },
  })
}

function getNextState(page: UserPageDto, { name, value }: UpdateCharacteristicDto) {
  return produce(page, (draft) => {
    draft.characteristic[name] = value
  })
}
