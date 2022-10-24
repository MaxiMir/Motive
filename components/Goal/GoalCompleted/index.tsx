import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box, Tooltip } from '@mui/material'
import { ConfirmationDto, GoalCharacteristicName, MAIN_CHARACTERISTICS, MemberDto } from 'dto'
import useClient from 'hooks/useClient'
import useLocale from 'hooks/useLocale'
import AppHeader from 'components/ui/AppHeader'
import AppDot from 'components/ui/AppDot'
import CharacteristicGoal from 'components/Characteristic/CharacteristicGoal'
import { checkOnRepeat, getGoalInfo } from './helper'
import i18n from './i18n'

const Typography = dynamic(() => import('@mui/material/Typography'))
const Inheritance = dynamic(() => import('./components/Inheritance'))
const Repeat = dynamic(() => import('./components/Repeat'))
const GallerySimple = dynamic(() => import('components/Gallery/GallerySimple'))
const AppMarkdown = dynamic(() => import('components/ui/AppMarkdown'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

export interface GoalCompletedProps {
  userId: number
  clientMembership: MemberDto[]
  confirmation: ConfirmationDto
}

export default function GoalCompleted({ userId, clientMembership, confirmation }: GoalCompletedProps) {
  const { goal, inherited } = confirmation
  const client = useClient()
  const { locale } = useLocale()
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(confirmation)
  const renderRepeat = checkOnRepeat(userId, clientMembership, goal, client)
  const { durationTitle } = i18n[locale]

  return (
    <Box
      sx={{
        padding: '3px',
        background: `linear-gradient(to top left, #fde76c, #813203, #ce8c00)`,
        borderRadius: '13px',
        flex: {
          xs: '0 1 100%',
          md: '0 1 calc(50% - 12px)',
        },
        maxWidth: '100%',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={(theme) => ({
          position: 'relative',
          height: '100%',
          padding: 2,
          paddingBottom: 3,
          background: theme.palette.content,
          borderRadius: '11px',
        })}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <AppHeader name="cup" variant="h6" component="h2">
            {goal.name}
          </AppHeader>
          {inherited && <Inheritance owner={goal.owner} locale={locale} />}
          <Typography variant="caption">
            {durationTitle}:{' '}
            <Tooltip arrow title={interval}>
              <Box component="b" color="zen.silent">
                {duration}
              </Box>
            </Tooltip>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Fragment key={characteristicName}>
              <CharacteristicGoal name={characteristicName} value={goal.characteristic[characteristicName]} />
              {characteristicName !== 'members' && <AppDot />}
            </Fragment>
          ))}
        </Box>
        {confirmation.text && <AppMarkdown text={confirmation.text} />}
        {mainPhoto && <GallerySimple photos={[mainPhoto]} />}
        {!!secondPhotos?.length && <GallerySimple photos={secondPhotos} />}
        {renderRepeat && <Repeat goalId={goal.id} locale={locale} />}
      </Box>
    </Box>
  )
}
