import { Field, Form, FormikProvider } from 'formik'
import { makeStyles } from '@material-ui/core'
import AppInput from 'components/UI/AppInput'
import AppIconButton from 'components/UI/AppIconButton'
import AutoSend from './components/AutoSend'
import useForm from './hook'

interface SearchFormProps {
  q?: string
}

export default function SearchForm({ q }: SearchFormProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(q || '')
  const { values, setFieldValue } = form

  const onClickClose = () => {
    setFieldValue('q', '')
  }

  return (
    <FormikProvider value={form}>
      <Form autoComplete="off">
        <Field
          name="q"
          label="Users, goals or hashtags"
          color="secondary"
          component={AppInput}
          InputProps={{
            startAdornment: <AppIconButton name="search" disabled className={classes.button} />,
            endAdornment: values.q && <AppIconButton name="close" className={classes.button} onClick={onClickClose} />,
          }}
        />
        <AutoSend />
      </Form>
    </FormikProvider>
  )
}

const useStyles = makeStyles({
  button: {
    '&:hover': {
      background: 'none',
    },
  },
})
