import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { createMember } from '@entities/member'
import { SearchParam, toHref, useClient } from '@entities/user'
import { CreateMemberDto } from '@shared/api/dto'
import { memberSchema } from '@shared/api/schemas'
import { setSearchParams } from '@shared/lib/helpers'
import { getMidnight } from '@shared/lib/utils'

export const useForm = (goalId: number, dayId: number) => {
  const client = useClient()
  const { push } = useRouter()
  const { mutateAsync } = useMutation(createMember, {
    onSuccess({ dayId: selectedDay }) {
      if (!client) return

      const href = toHref(client.nickname)
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
