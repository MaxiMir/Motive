import { useFormik } from 'formik'
import { DaySupportDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'

export default function useForm(onClose: () => void): UseFormType<DaySupportDto> {
  const { isLoading, send } = useSendSupport(onClose)
  const formik = useFormik<DaySupportDto>({
    initialValues: {
      support: '',
    },
    // validationSchema: schema,
    async onSubmit(data) {
      // send(data)
    },
  })

  return { isLoading, formik }
}

const useSendSupport = (onClose: () => void) => {
  return useSend(GoalService.create, {
    onSuccess(goal) {
      onClose()
    },
  })
}
