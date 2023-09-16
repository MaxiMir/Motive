import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { ChangeEvent, useDeferredValue, useId } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { SphereProgress } from 'entities/characteristic'
import { useDetectMobile } from 'entities/device'
import { SphereDto } from 'shared/api'
import { range } from 'shared/lib/helpers'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { getRateMessageId, parseScales } from './lib'
import { useEditSphereForm } from './model'

const Alert = dynamic(() => import('@mui/material/Alert'))

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
  const mobile = useDetectMobile()
  const form = useEditSphereForm(userId, sphere, value, onClose)
  const { values, setFieldValue, isSubmitting, handleSubmit } = form
  const deferredValue = useDeferredValue(values.value)
  const rateMessageId = getRateMessageId(deferredValue)
  const title = formatMessage({ id: `common.${sphere}` })
  const scales = parseScales(formatMessage({ id: 'common.sphere-scales' }))
  const estimationText = formatMessage({ id: 'common.sphere-estimation' })
  const buttonText = formatMessage({ id: 'common.save' })
  const loadingText = formatMessage({ id: 'common.saving' })
  const alertText = rateMessageId && formatMessage({ id: rateMessageId })
  const summeryText = formatMessage({ id: 'common.sphere-summery' })
  const details = range(4).map((id) => formatMessage({ id: `common.sphere-details${id}` }))

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('value', Number(e.target.value))
  }

  return (
    <Modal
      title={title}
      fullScreen={mobile}
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
            <Stack gap={2} mt={1}>
              <Box display="flex" gap={3}>
                <RadioGroup
                  name="value"
                  value={values.value}
                  aria-labelledby={labelId}
                  onChange={onChange}
                >
                  {scales.map(({ scale, number }) => (
                    <FormControlLabel
                      label={`${number} - ${scale}`}
                      value={number}
                      checked={values.value === number}
                      control={<Radio size="small" />}
                      key={scale}
                    />
                  ))}
                </RadioGroup>
                <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                  <SphereProgress sphere={sphere} icon={icon} value={deferredValue} />
                </Box>
              </Box>
              <Accordion
                iconStart={<Icon name="lightbulb" color="primary.main" />}
                summary={summeryText}
                details={
                  <Stack gap={1}>
                    {details.map((detail) => (
                      <Typography key={detail}>{detail}</Typography>
                    ))}
                  </Stack>
                }
              />
              {alertText && (
                <Alert icon={false} color="info">
                  {alertText}
                </Alert>
              )}
            </Stack>
          </FormControl>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default EditSphereModal
