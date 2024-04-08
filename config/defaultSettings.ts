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
  title: 'Echo Blog CMS',
  pwa: true,
  logo: '/logo.png',
  iconfontUrl: '',
}

export default Settings
