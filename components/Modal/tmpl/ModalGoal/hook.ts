import produce from 'immer'
import { useFormik } from 'formik'
import { GoalCreationDto, GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { UseFormType } from 'hooks/useFormType'
import { useMutateGoals } from 'views/User/hook'
import { scrollToElem } from 'helpers/dom'
import schema from './schema'

export default function useForm(onClose: () => void): UseFormType<GoalCreationDto> {
  const { isLoading, send } = useSendCreateGoal(onClose)
  const formik = useFormik<GoalCreationDto>({
    initialValues: {
      name: '',
      hashtags: '',
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })

  return { isLoading, formik }
}

const useSendCreateGoal = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()

  return useSend(GoalService.create, {
    onSuccess(data) {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          draft.push(data)
        }),
      )
      onClose()
      enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${data.id}`), 500)
    },
  })
}
