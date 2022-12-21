import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { SearchParam } from '@href'
import { getMidnight } from '@lib/date'
import { getUserHref } from '@features/user'
import { setSearchParams } from '@helpers/url'
import { CreateMemberDto, MemberService, memberSchema } from '@features/member'
import useClient from '@hooks/useClient'

export const useForm = (goalId: number, dayId: number) => {
  const client = useClient()
  const { push } = useRouter()
  const { mutate } = useMutation(MemberService.create, {
    onSuccess({ dayId: selectedDay }) {
      if (!client) return

      const href = getUserHref(client.nickname)
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
    onSubmit(data) {
      mutate(data)
    },
  })
}
