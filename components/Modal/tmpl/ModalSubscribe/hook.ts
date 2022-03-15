import { useRouter } from 'next/router'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateMemberDto, GoalDto } from 'dto'
import MemberService from 'services/MemberService'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import useClient from 'hooks/useClient'
import { getUserHref } from 'views/UserView/helper'
import schema from 'schemas/member'

export default function useForm(goal: GoalDto): FormikProps<CreateMemberDto> {
  const { id, calendar } = goal
  const { mutateAsync } = useSendSubscribe(goal)
  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId: id,
      dayId: calendar[0].id.toString(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendSubscribe = (goal: GoalDto) => {
  const client = useClient()
  const router = useRouter()

  return useMutation(MemberService.create, {
    onSuccess() {
      if (!client) {
        return
      }

      const userHref = getUserHref(client.nickname)
      const params = { [SEARCH_PARAMS.DATES]: `${goal.id}:${goal.day.id}` }

      router.push(setQueryParams(userHref, params))
    },
  })
}
