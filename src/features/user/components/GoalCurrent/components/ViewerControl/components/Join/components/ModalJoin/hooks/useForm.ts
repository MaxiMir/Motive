import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { getUserHref, SearchParam } from '@href'
import { CreateMemberDto } from '@dto'
import memberSchema from '@schemas/member'
import MemberService from '@services/member'
import { getMidnight } from '@lib/date'
import useClient from '@hooks/useClient'
import { setSearchParams } from '@helpers/url'

const useForm = (goalId: number, dayId: number) => {
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

export default useForm
