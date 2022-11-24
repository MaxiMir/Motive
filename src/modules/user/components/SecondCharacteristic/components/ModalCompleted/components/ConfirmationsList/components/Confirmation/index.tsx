import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Tooltip } from '@mui/material'
import { ConfirmationDto, GoalCharacteristicName, MAIN_CHARACTERISTICS, MemberDto } from '@dto'
import useClient from '@hooks/useClient'
import AppHeader from '@ui/AppHeader'
import AppDot from '@ui/AppDot'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import { checkOnRepeat, getGoalInfo } from './helper'

const Typography = dynamic(() => import('@mui/material/Typography'))
const GallerySimple = dynamic(() => import('@components/Gallery/GallerySimple'))
const AppMarkdown = dynamic(() => import('@ui/AppMarkdown'))
const Inheritance = dynamic(() => import('./components/Inheritance'))
const Repeat = dynamic(() => import('./components/Repeat'))

const CHARACTERISTICS: GoalCharacteristicName[] = [...MAIN_CHARACTERISTICS, 'members']

interface ConfirmationProps {
  userId: number
  clientMembership: MemberDto[]
  confirmation: ConfirmationDto
}

export default function Confirmation({ userId, clientMembership, confirmation }: ConfirmationProps) {
  const { goal, inherited } = confirmation
  const { formatMessage } = useIntl()
  const client = useClient()
  const { duration, mainPhoto, secondPhotos, interval } = getGoalInfo(confirmation)
  const renderRepeat = checkOnRepeat(userId, clientMembership, goal, client)
  const durationTitle = formatMessage({ id: 'common.duration' })

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
          {inherited && <Inheritance owner={goal.owner} />}
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
        {renderRepeat && <Repeat goalId={goal.id} />}
      </Box>
    </Box>
  )
}