import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateMemberDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import MemberService from 'services/MemberService'
import useClient from 'hooks/useClient'
import { getUserHref } from 'views/UserView/helper'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import schema from 'schemas/member'

export default function useForm(goal: GoalDto): UseFormType<CreateMemberDto> {
  const { id, calendar } = goal
  const { isLoading, mutate } = useSendNewDay(goal)
  const formik = useFormik<CreateMemberDto>({
    initialValues: {
      goalId: id,
      start: calendar[0].id.toString(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendNewDay = (goal: GoalDto) => {
  const client = useClient()
  const router = useRouter()

  return useMutation(MemberService.add, {
    onSuccess() {
      if (!client) {
        return
      }

      const userHref = getUserHref(client.nickname)

      router.push(setQueryParams(userHref, { [SEARCH_PARAMS.DATES]: `${goal.id}:${goal.day.id}` }))
    },
  })
}
