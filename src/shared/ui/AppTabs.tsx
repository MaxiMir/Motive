import { ChangeEvent, useState } from 'react'
import { Box, Tab, Tabs, TabsProps } from '@mui/material'
import { tabsClasses } from '@mui/material/Tabs'

interface AppTabsProps extends Pick<TabsProps, 'aria-label'> {
  tabs: string[] | JSX.Element[]
  content: string[] | JSX.Element[]
  initial?: number
}

function AppTabs({ tabs, content, initial = 0, ...tabsProps }: AppTabsProps) {
  const [value, setValue] = useState(initial)

  const getA11yTabProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  })

  const getA11yContentProps = (index: number) => ({
    id: `tabpanel-${index}`,
    'aria-labelledby': `tab-${index}`,
  })

  const onChange = (_event: ChangeEvent<unknown>, newValue: number) => setValue(newValue)

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={value}
          variant="fullWidth"
          {...tabsProps}
          sx={({ palette }) => ({
            [`& .${tabsClasses.indicator}`]: {
              background: `linear-gradient(to right, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
            },
          })}
          onChange={onChange}
        >
          {tabs.map((tab, index) => {
            const a11yTabProps = getA11yTabProps(index)

            return (
              <Tab
                label={tab}
                key={a11yTabProps.id}
                {...a11yTabProps}
                sx={{ textTransform: 'none' }}
              />
            )
          })}
        </Tabs>
      </Box>
      {content.map((tabContent, index) => {
        const a11yContentProps = getA11yContentProps(index)

        return (
          <Box
            role="tabpanel"
            hidden={value !== index}
            {...a11yContentProps}
            key={a11yContentProps.id}
          >
            {tabContent}
          </Box>
        )
      })}
    </>
  )
}

export default AppTabs
