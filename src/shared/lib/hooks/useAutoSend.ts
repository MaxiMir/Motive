import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import useDebounceCb from '@lib/hooks/useDebounceCb'

const useAutoSend = (debounceMs = 1000): void => {
  const formik = useFormikContext()
  const debouncedSubmit = useDebounceCb<void>(() => {
    if (!formik.dirty) return

    formik.handleSubmit()
  }, debounceMs)

  useEffect(debouncedSubmit, [formik.values, debouncedSubmit])
}

export default useAutoSend
