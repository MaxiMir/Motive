import { FormikProps, useFormik } from 'formik'
import { CreateMemberDto } from 'dto'
import { useSendCreateMember } from 'views/UserView/hook'
import schema from 'schemas/member'

export default function useForm(goalId: number, dayId: number): FormikProps<CreateMemberDto> {
  const { mutateAsync } = useSendCreateMember()

  return useFormik<CreateMemberDto>({
    initialValues: {
      goalId,
      dayId: dayId.toString(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
