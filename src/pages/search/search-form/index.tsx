import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { useSearchForm } from 'features/page/search'
import Icon from 'shared/ui/icon'
import Input from 'shared/ui/input'
import { AutoSend } from './auto-send'

interface SearchFormProps {
  q?: string
}

export function SearchForm({ q = '' }: SearchFormProps) {
  const form = useSearchForm(q)
  const { values, setFieldValue } = form
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'page.search.form' })
  const deleteText = formatMessage({ id: 'common.delete' })

  const onClickClose = () => setFieldValue('q', '')

  return (
    <FormikProvider value={form}>
      <Form>
        <Field
          name="q"
          label={label}
          color="secondary"
          InputProps={{
            disabled: true,
            startAdornment: (
              <InputAdornment disableFocusRipple disabled>
                <Icon name="search" />
              </InputAdornment>
            ),
            endAdornment: values.q && (
              <InputAdornment aria-label={deleteText} disableFocusRipple onClick={onClickClose}>
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
