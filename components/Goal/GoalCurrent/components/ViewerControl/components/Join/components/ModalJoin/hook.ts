import { FormikProps, useFormik } from 'formik'
import { CreateMemberDto } from 'dto'
import schema from 'schemas/member'
import { getToday } from 'helpers/date'
import { useSendCreateMember } from 'pages/[id]/hook'

export default function useForm(goalId: number, dayId: number): FormikProps<CreateMemberDto> {
  const { mutateAsync } = useSendCreateMember()

  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId,
      dayId: dayId.toString(),
      started: getToday(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
