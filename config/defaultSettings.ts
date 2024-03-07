import { ProLayoutProps } from '@ant-design/pro-components'

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  colorPrimary: '#ff5a79',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Echo Blog',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
}

export default Settings
