import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useClient } from 'entities/user'
import { CreateMemberDto, createMember } from 'shared/api'
import { SearchParam } from 'shared/config'
import { joinToHref, setSearchParams } from 'shared/lib/helpers'
import { getMidnight } from 'shared/lib/utils'
import { memberSchema } from './schema'

export const useCreateMemberForm = (goalId: number, dayId: number) => {
  const client = useClient()
  const { push } = useRouter()
  const { mutateAsync } = useMutation(createMember, {
    onSuccess({ dayId: selectedDay }) {
      if (!client) return

      const href = joinToHref(client.nickname)
      const params = { [SearchParam.Dates]: `${goalId}:${selectedDay}` }
      push(setSearchParams(href, params))
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
