import { FormikProps, useFormik } from 'formik'
import { CreateMemberDto } from 'src/common/dto'
import validationSchema from 'src/common/schemas/member'
import { getToday } from 'src/common/helpers/date'
import { useSendCreateMember } from '@modules/user'

export default function useForm(goalId: number, dayId: number): FormikProps<CreateMemberDto> {
  const { mutateAsync } = useSendCreateMember()

  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId,
      dayId: dayId.toString(),
      started: getToday(),
    },
    validationSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
