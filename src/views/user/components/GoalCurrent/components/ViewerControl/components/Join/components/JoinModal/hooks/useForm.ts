import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { getMidnight } from '@lib/date'
import { SearchParam, toHref } from '@modules/user'
import { setSearchParams } from '@helpers/url'
import { CreateMemberDto, MemberService, memberSchema } from '@modules/member'
import useClient from '@hooks/useClient'

export const useForm = (goalId: number, dayId: number) => {
  const client = useClient()
  const { push } = useRouter()
  const { mutateAsync } = useMutation(MemberService.create, {
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
