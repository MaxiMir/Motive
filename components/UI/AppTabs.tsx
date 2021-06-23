import { ChangeEvent, useState } from 'react'
import { Container, createStyles, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface AppTabsProps {
  tabs: string[] | JSX.Element[]
  content: string[] | JSX.Element[]
  ariaLabel: string
}

const AppTabs = ({ tabs, content, ariaLabel }: AppTabsProps) => {
  const [value, setValue] = useState(0)
  const classes = useStyles()

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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
          {tabs.map((tab, index) => (
            <Tab label={tab} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </Container>
      {content.map((content, index) => (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          key={index}
        >
          {value === index && content}
        </div>
      ))}
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

export default AppTabs
