import { Box, FormControl, FormLabel, Radio, FormControlLabel, RadioGroup } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { ChangeEvent, useDeferredValue, useId } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { SphereProgress } from 'entities/characteristic'
import { SphereDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useEditSphereForm } from './model'

const Hint = dynamic(() => import('./hint'))

interface EditSphereProps {
  userId: number
  sphere: SphereDto
  icon: string
  value: number
  onClose: () => void
}

function EditSphereModal({ userId, sphere, icon, value, onClose }: EditSphereProps) {
  const { formatMessage } = useIntl()
  const labelId = useId()
  const form = useEditSphereForm(userId, sphere, value, onClose)
  const { values, setFieldValue, isSubmitting, handleSubmit } = form
  const deferredValue = useDeferredValue(values.value)
  const title = formatMessage({ id: `common.${sphere}` })
  const scales = formatMessage({ id: 'common.sphere-scales' }).split(';')
  const estimationText = formatMessage({ id: 'common.sphere-estimation' })
  const buttonText = formatMessage({ id: 'common.save' })
  const loadingText = formatMessage({ id: 'common.saving' })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('value', Number(e.target.value))
  }

  return (
    <Modal
      maxWidth="xs"
      title={title}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <FormControl>
            <FormLabel id={labelId}>{estimationText}</FormLabel>
            <Box display="flex" my={2} gap={3}>
              <RadioGroup
                name="value"
                value={values.value}
                aria-labelledby={labelId}
                onChange={onChange}
              >
                {scales.map((scale, index) => (
                  <FormControlLabel
                    label={scale}
                    value={index}
                    checked={values.value === index}
                    control={<Radio size="small" />}
                    key={scale}
                  />
                ))}
              </RadioGroup>
              <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                <SphereProgress sphere={sphere} icon={icon} value={deferredValue} />
              </Box>
            </Box>
            {!!deferredValue && <Hint value={deferredValue} />}
          </FormControl>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default EditSphereModal
