import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { styled } from '@mui/system'
import AppInput from '@ui/AppInput'
import AppIconButton from '@ui/AppIconButton'
import AutoSend from './components/AutoSend'
import useForm from './hooks/useForm'

interface SearchFormProps {
  q?: string
}

function SearchForm({ q = '' }: SearchFormProps) {
  const { formatMessage } = useIntl()
  const form = useForm(q)
  const { values, setFieldValue } = form
  const label = formatMessage({ id: 'page.search.form' })

  const onClickClose = () => setFieldValue('q', '')

  return (
    <FormikProvider value={form}>
      <Form autoComplete="off">
        <Field
          name="q"
          label={label}
          color="secondary"
          InputProps={{
            disabled: true,
            startAdornment: <InputButton name="search" disabled />,
            endAdornment: values.q && <InputButton name="close" onClick={onClickClose} />,
          }}
          component={AppInput}
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

export default SearchForm
