import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { styled } from '@mui/system'
import AppInput from 'src/common/ui/AppInput'
import AppIconButton from 'src/common/ui/AppIconButton'
import AutoSend from './components/AutoSend'
import useForm from './hook'

interface SearchFormProps {
  q?: string
}

export default function SearchForm({ q }: SearchFormProps) {
  const { formatMessage } = useIntl()
  const form = useForm(q || '')
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
