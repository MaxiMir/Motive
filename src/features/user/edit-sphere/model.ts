import { useFormik } from 'formik'
import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { SphereDto, UpdateCharacteristicDto, updateCharacteristic } from 'shared/api'
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
      onSuccess(_, req) {
        const message = formatMessage({ id: 'common.sphere-updated' })

        flushSync(() => {
          const nextState = produce(page, (draft) => {
            draft.characteristic[req.name] = req.value
          })
          mutatePage(nextState)
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
    onSubmit(res) {
      return mutateAsync(res).then(onSuccess)
    },
  })
}
