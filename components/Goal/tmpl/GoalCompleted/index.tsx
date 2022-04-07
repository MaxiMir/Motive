import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material'
import { ConfirmationDto, GoalCharacteristicName } from 'dto'
import useClient from 'hooks/useClient'
import useLocale from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppDot from 'components/UI/AppDot'
import AppTooltip from 'components/UI/AppTooltip'
import Characteristic from 'components/Characteristic'
import { getGoalInfo } from './helper'
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
  userId: number
  inView: boolean
  onView: () => void
}

export default function GoalCompleted({ confirmation, userId, inView, onView }: GoalCompletedProps): JSX.Element {
  const { goal, inherited } = confirmation
  const theme = useTheme()
  const client = useClient()
  const { locale } = useLocale()
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(confirmation)
  const isOwner = goal.owner.id === client?.id
  const clientPage = userId === client?.id
  const renderRepeat = !clientPage && !isOwner
  const { durationTitle } = i18n[locale]

  return (
    <AppBox
      display={undefined}
      sx={{
        padding: '3px',
        background: `linear-gradient(to top left, #fde76c, #813203, #ce8c00)`,
        borderRadius: '13px',
      }}
    >
      <AppBox
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
        <AppBox flexDirection="column" gap={1}>
          <AppTitle name="cup" variant="h6" component="h3">
            {goal.name}
          </AppTitle>
          {inherited && <Inheritance owner={goal.owner} locale={locale} />}
          <Typography variant="caption">
            {durationTitle}{' '}
            <AppTooltip title={interval}>
              <AppBox display={undefined} component="b" color="zen.silent">
                {duration}
              </AppBox>
            </AppTooltip>
          </Typography>
        </AppBox>
        {mainPhoto && <Gallery tmpl="simple" photos={[mainPhoto]} animation />}
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Fragment key={characteristicName}>
              <Characteristic tmpl="goal" name={characteristicName} value={goal.characteristic[characteristicName]} />
              {characteristicName !== 'members' && <AppDot />}
            </Fragment>
          ))}
        </AppBox>
        {confirmation.text && <Typography>{confirmation.text}</Typography>}
        {!!secondPhotos?.length && <SecondPhotos id={goal.id} photos={secondPhotos} locale={locale} />}
        {renderRepeat && <Repeat goalId={goal.id} locale={locale} />}
      </AppBox>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </AppBox>
  )
}
