import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { Field, Form, FormikProvider } from 'formik'
import { useSearchPageAsync } from '@entities/pages'
import Icon from '@shared/ui/Icon'
import Input from '@shared/ui/Input'
import AutoSend from './components/AutoSend'
import { useMessages } from './hooks/useMessages'

interface SearchFormProps {
  q?: string
}

function SearchForm({ q = '' }: SearchFormProps) {
  const messages = useMessages()
  const form = useSearchPageAsync(q)
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
                <Icon name="search" />
              </InputAdornment>
            ),
            endAdornment: values.q && (
              <InputAdornment
                aria-label={messages.deleteText}
                disableFocusRipple
                onClick={onClickClose}
              >
                <Icon name="close" />
              </InputAdornment>
            ),
          }}
          component={Input}
        />
        <AutoSend />
      </Form>
    </FormikProvider>
  )
}

const InputAdornment = styled(IconButton)({
  ':hover': {
    background: 'none',
  },
})

export default SearchForm
