import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { CreateMemberDto } from '@shared/api/member'
import { SearchParam, toHref } from '@entities/user'
import { memberSchema, createMember } from '@entities/member'
import { getMidnight } from '@shared/lib/utils/date'
import { setSearchParams } from '@shared/lib/helpers/url'
import useClient from '@shared/lib/hooks/useClient'

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
