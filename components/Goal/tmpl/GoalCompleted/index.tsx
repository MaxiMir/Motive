import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box, Tooltip, useTheme } from '@mui/material'
import { ConfirmationDto, GoalCharacteristicName, UserDetailDto } from 'dto'
import useClient from 'hooks/useClient'
import useLocale from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppDot from 'components/UI/AppDot'
import Characteristic from 'components/Characteristic'
import { checkOnRepeat, getGoalInfo } from './helper'
import i18n from './i18n'

const Typography = dynamic(() => import('@mui/material/Typography'))
const AppInView = dynamic(() => import('components/UI/AppInView'))
const Gallery = dynamic(() => import('components/Gallery'))
const Inheritance = dynamic(() => import('./components/Inheritance'))
const SecondPhotos = dynamic(() => import('./components/SecondPhotos'))
const Repeat = dynamic(() => import('./components/Repeat'))

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support', 'members']

export interface GoalCompletedProps {
  tmpl: 'completed'
  confirmation: ConfirmationDto
  user: UserDetailDto
  inView: boolean
  onView: () => void
}

export default function GoalCompleted({ confirmation, user, inView, onView }: GoalCompletedProps): JSX.Element {
  const { goal, inherited } = confirmation
  const theme = useTheme()
  const client = useClient()
  const { locale } = useLocale()
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(confirmation)
  const renderRepeat = checkOnRepeat(user, goal, client)
  const { durationTitle } = i18n[locale]

  return (
    <Box
      sx={{
        padding: '3px',
        background: `linear-gradient(to top left, #fde76c, #813203, #ce8c00)`,
        borderRadius: '13px',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          position: 'relative',
          height: '100%',
          padding: 2,
          paddingBottom: 3,
          background: theme.palette.content,
          borderRadius: '11px',
        }}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <AppTitle name="cup" variant="h6" component="h3">
            {goal.name}
          </AppTitle>
          {inherited && <Inheritance owner={goal.owner} locale={locale} />}
          <Typography variant="caption">
            {durationTitle}{' '}
            <Tooltip arrow title={interval}>
              <Box component="b" color="zen.silent">
                {duration}
              </Box>
            </Tooltip>
          </Typography>
        </Box>
        <Box minHeight={320}>{mainPhoto && <Gallery tmpl="simple" photos={[mainPhoto]} animation />}</Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Fragment key={characteristicName}>
              <Characteristic tmpl="goal" name={characteristicName} value={goal.characteristic[characteristicName]} />
              {characteristicName !== 'members' && <AppDot />}
            </Fragment>
          ))}
        </Box>
        {confirmation.text && <Typography>{confirmation.text}</Typography>}
        {!!secondPhotos?.length && <SecondPhotos id={goal.id} photos={secondPhotos} locale={locale} />}
        {renderRepeat && <Repeat goalId={goal.id} locale={locale} />}
      </Box>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </Box>
  )
}
