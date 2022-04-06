import { SvgIcon, SvgIconProps } from '@mui/material'

export default function SearchIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <path d="M23.7728 22.6943L17.5762 16.5969C19.1989 14.834 20.1959 12.5024 20.1959 9.93683C20.1951 4.44852 15.6745 0 10.0976 0C4.52065 0 0 4.44852 0 9.93683C0 15.4251 4.52065 19.8737 10.0976 19.8737C12.5072 19.8737 14.7172 19.0402 16.4532 17.6546L22.6738 23.7761C22.9769 24.0746 23.469 24.0746 23.7721 23.7761C24.0759 23.4775 24.0759 22.9929 23.7728 22.6943ZM10.0976 18.3448C5.37888 18.3448 1.55365 14.5804 1.55365 9.93683C1.55365 5.29321 5.37888 1.52884 10.0976 1.52884C14.8163 1.52884 18.6415 5.29321 18.6415 9.93683C18.6415 14.5804 14.8163 18.3448 10.0976 18.3448Z" />
    </SvgIcon>
  )
}
