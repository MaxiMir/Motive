import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useDebounceCb } from './useDebounceCb'

export function useAutoSend(debounceMs = 1000) {
  const formik = useFormikContext()
  const debouncedSubmit = useDebounceCb<void>(() => {
    if (!formik.dirty) return

    formik.handleSubmit()
  }, debounceMs)

  useEffect(debouncedSubmit, [formik.values, debouncedSubmit])
}
