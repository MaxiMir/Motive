import { Field, Form, FormikProvider } from 'formik'
import { styled } from '@mui/system'
import useLocale from 'hooks/useLocale'
import AppInput from 'components/UI/AppInput'
import AppIconButton from 'components/UI/AppIconButton'
import AutoSend from './components/AutoSend'
import useForm from './hook'
import i18n from './i18n'

interface SearchFormProps {
  q?: string
}

export default function SearchForm({ q }: SearchFormProps): JSX.Element {
  const form = useForm(q || '')
  const { locale } = useLocale()
  const { label } = i18n[locale]
  const { values, setFieldValue } = form

  const onClickClose = () => setFieldValue('q', '')

  return (
    <FormikProvider value={form}>
      <Form autoComplete="off">
        <Field
          name="q"
          label={label}
          color="secondary"
          component={AppInput}
          InputProps={{
            disabled: true,
            startAdornment: <InputButton name="search" disabled />,
            endAdornment: values.q && <InputButton name="close" onClick={onClickClose} />,
          }}
        />
        <AutoSend />
      </Form>
    </FormikProvider>
  )
}

const InputButton = styled(AppIconButton)({
  '&:hover': {
    background: 'none',
  },
})
