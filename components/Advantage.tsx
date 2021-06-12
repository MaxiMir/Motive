import { FC } from 'react'
import Image from 'next/image'
import {
  createStyles,
  SimplePaletteColorOptions,
  Typography,
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { AppBox } from 'components/UI/AppBox'

interface AdvantageProps {
  type: string
  title: string
  subtitle: string
  color: SimplePaletteColorOptions
}

export const Advantage: FC<AdvantageProps> = ({
  type,
  title,
  subtitle,
  color,
}) => {
  const classes = useStyles({ color })

  return (
    <AppBox
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <AppBox alignItems="center" spacing={3}>
        <Image src={`/images/${type}.png`} width={60} height={60} alt={type} />
        <AppBox flexDirection="column" spacing={1}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Typography>{subtitle}</Typography>
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      background: (props: { color: SimplePaletteColorOptions }) =>
        `linear-gradient(90deg, ${props.color.light} 0%, ${props.color.dark} 100%)`,
    },
    title: {
      width: 210,
      textTransform: 'uppercase',
      fontWeight: 500,
    },
  }),
)
