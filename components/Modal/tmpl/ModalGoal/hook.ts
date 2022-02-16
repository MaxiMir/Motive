import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateGoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { scrollToElem } from 'helpers/dom'
import schema from 'schemas/goal'
import { getGoalNextState } from './helper'

export default function useForm(onSuccess: () => void): UseFormType<CreateGoalDto> {
  const { isLoading, mutate } = useSendCreateGoal(onSuccess)
  const formik = useFormik<CreateGoalDto>({
    initialValues: {
      name: '',
      hashtags: '',
      stages: [],
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendCreateGoal = (onSuccess: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutate] = useMutateGoals()

  return useMutation(GoalService.create, {
    onSuccess(goal) {
      mutate(getGoalNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
