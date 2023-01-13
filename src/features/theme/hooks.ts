import { useInsertionEffect } from 'react'

export const useRemoveServerStyles = () => {
  useInsertionEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
}
