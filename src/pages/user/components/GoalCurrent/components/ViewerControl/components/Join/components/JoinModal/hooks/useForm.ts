import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { getMidnight } from '@lib/utils/date'
import { setSearchParams } from '@lib/helpers/url'
import { SearchParam, toHref } from '@entities/user'
import { CreateMemberDto, MemberService } from '@entities/member'
import useClient from '@lib/hooks/useClient'

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
    validationSchema: object({
      goalId: string().required(),
      dayId: string().required(),
    }),
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
