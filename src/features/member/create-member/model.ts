import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useViewer } from 'entities/viewer'
import { CreateMemberDto, createMember } from 'shared/api'
import { SearchParam } from 'shared/config'
import { joinToHref, setSearchParams } from 'shared/lib/helpers'
import { getMidnight } from 'shared/lib/utils'
import { memberSchema } from './schema'

export const useCreateMemberForm = (goalId: number, dayId: number, onSuccess: () => void) => {
  const viewer = useViewer()
  const { push } = useRouter()
  const { mutateAsync } = useMutation(createMember, {
    onSuccess({ dayId: selectedDay }) {
      if (!viewer) return

      const href = joinToHref(viewer.nickname)
      const params = { [SearchParam.Dates]: `${goalId}:${selectedDay}` }
      push(setSearchParams(href, params)).then(onSuccess)
    },
  })

  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId,
      dayId: dayId.toString(),
      started: getMidnight(),
    },
    validationSchema: memberSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
