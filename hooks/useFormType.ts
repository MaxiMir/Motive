import { FormikProps } from 'formik'

export type UseFormType<T> = { isLoading: boolean; formik: FormikProps<T> }
