import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalCreationDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { scrollToElem } from 'helpers/dom'
import schema from 'schemas/goal'
import { getGoalNextState } from './helper'

export default function useForm(onClose: () => void): UseFormType<GoalCreationDto> {
  const { isLoading, mutate } = useSendCreateGoal(onClose)
  const formik = useFormik<GoalCreationDto>({
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

const useSendCreateGoal = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutate] = useMutateGoals()

  return useMutation(GoalService.create, {
    onSuccess(goal) {
      mutate(getGoalNextState(goals, goal))
      onClose()
      enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
