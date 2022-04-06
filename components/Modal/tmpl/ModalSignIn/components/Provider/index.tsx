import Image from 'next/image'
import { signIn, SignInOptions } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react/types'
import { Button } from '@mui/material'
import { common } from '@mui/material/colors'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface ProviderProps {
  provider: ClientSafeProvider
  options: SignInOptions
  disabled: boolean
  locale: Locale
}

export default function Provider({ provider, options, disabled, locale }: ProviderProps): JSX.Element {
  const { id, name } = provider
  const { pretext } = i18n[locale]

  return (
    <Button
      variant="outlined"
      startIcon={<Image src={`/images/svg/${id}.svg`} alt={name} width={24} height={24} />}
      key={id}
      disabled={disabled}
      sx={{ color: common.white }}
      onClick={() => signIn(id, options)}
    >
      <AppBox width={120} justifyContent="flex-start">
        {pretext} {name}
      </AppBox>
    </Button>
  )
}
