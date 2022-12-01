import { useIntl } from 'react-intl'
import { Field, Form, FormikProvider } from 'formik'
import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
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
            startAdornment: (
              <InputAdornment disableFocusRipple disabled>
                <AppIcon name="search" />
              </InputAdornment>
            ),
            endAdornment: values.q && (
              <InputAdornment disableFocusRipple onClick={onClickClose}>
                <AppIcon name="close" />
              </InputAdornment>
            ),
          }}
          component={AppInput}
        />
        <AutoSend />
      </Form>
    </FormikProvider>
  )
}

const InputAdornment = styled(IconButton)({
  '&:hover': {
    background: 'none',
  },
})

export default SearchForm