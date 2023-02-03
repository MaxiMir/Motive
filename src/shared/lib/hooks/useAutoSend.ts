import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useDebounceCb } from './useDebounceCb'

export const useAutoSend = (debounceMs = 1000) => {
  const formik = useFormikContext()
  const debouncedSubmit = useDebounceCb<void>(() => {
    if (!formik.dirty) return

    formik.handleSubmit()
  }, debounceMs)

  useEffect(debouncedSubmit, [formik.values, debouncedSubmit])
}
