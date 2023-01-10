import { Field, Form, FormikProvider } from 'formik'
import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'
import AutoSend from './components/AutoSend'

interface SearchFormProps {
  q?: string
}

function SearchForm({ q = '' }: SearchFormProps) {
  const messages = useMessages()
  const form = useForm(q)
  const { values, setFieldValue } = form

  const onClickClose = () => setFieldValue('q', '')

  return (
    <FormikProvider value={form}>
      <Form>
        <Field
          name="q"
          label={messages.label}
          color="secondary"
          InputProps={{
            disabled: true,
            startAdornment: (
              <InputAdornment disableFocusRipple disabled>
                <AppIcon name="search" />
              </InputAdornment>
            ),
            endAdornment: values.q && (
              <InputAdornment
                aria-label={messages.deleteText}
                disableFocusRipple
                onClick={onClickClose}
              >
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
