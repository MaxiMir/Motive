import { FormikProps, useFormik } from 'formik'
import { CreateMemberDto } from '@dto'
import { memberSchema } from '@schemas/member'
import { getToday } from '@utils/date'
import { useSendCreateMember } from '@modules/user/hook'

export default function useForm(goalId: number, dayId: number): FormikProps<CreateMemberDto> {
  const { mutateAsync } = useSendCreateMember()

  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId,
      dayId: dayId.toString(),
      started: getToday(),
    },
    validationSchema: memberSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
