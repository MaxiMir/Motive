import { ChangeEvent, useState } from 'react'
import { Container, createStyles, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface AppTabsProps {
  tabs: string[] | JSX.Element[]
  content: string[] | JSX.Element[]
  ariaLabel: string
  initial?: number
}

export default function AppTabs({ tabs, content, ariaLabel, initial = 0 }: AppTabsProps): JSX.Element {
  const classes = useStyles()
  const [value, setValue] = useState(initial)

  const getA11yTabProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

  const getA11yContentProps = (index: number) => ({
    id: `simple-tabpanel-${index}`,
    'aria-labelledby': `simple-tab-${index}`,
  })

  const onChange = (_event: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Container fixed>
        <Tabs
          value={value}
          aria-label={ariaLabel}
          classes={{ indicator: classes.indicator }}
          variant="fullWidth"
          onChange={onChange}
        >
          {tabs.map((tab, index) => {
            const a11yTabProps = getA11yTabProps(index)

            return <Tab label={tab} key={a11yTabProps.id} {...a11yTabProps} />
          })}
        </Tabs>
      </Container>
      {content.map((tabContent, index) => {
        const a11yContentProps = getA11yContentProps(index)

        return (
          <div role="tabpanel" hidden={value !== index} {...a11yContentProps} key={a11yContentProps.id}>
            {value === index && tabContent}
          </div>
        )
      })}
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    indicator: {
      background: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
    },
  }),
)
