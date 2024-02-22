/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/article',
    redirect: '/article/article-list',
  },
  {
    path: '/friend',
    redirect: '/friend/friend-list',
  },
  {
    path: '/system',
    redirect: '/system/system-user',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    component: './Dashboard',
    access: 'dashboard',
  },
  {
    name: 'article',
    icon: 'readOutlined',
    path: '/article',
    access: 'article',
    routes: [
      {
        name: 'article-list',
        path: 'article-list',
        component: './Article/ArticleList',
      },
      {
        name: 'create-article',
        path: 'create-article',
        component: './Article/CreateArticle',
      },
      {
        name: 'article-attachment',
        path: 'article-attachment',
        component: './Article/ArticleAttachment',
      },
    ],
  },
  {
    name: 'category',
    icon: 'folderOutlined',
    path: '/category',
    component: './Category',
    access: 'category',
  },
  {
    name: 'tag',
    icon: 'tag',
    path: '/tag',
    component: './Tag',
    access: 'tag',
  },
  {
    name: 'comment',
    icon: 'comment',
    path: '/comment',
    component: './Comment',
    access: 'comment',
  },

  {
    name: 'friend',
    icon: 'linkOutlined',
    path: '/friend',
    access: 'friend',
    routes: [
      {
        name: 'friend-list',
        path: 'friend-list',
        component: './Friend/FriendList',
      },
      {
        name: 'friend-apply',
        path: 'friend-apply',
        component: './Friend/FriendApply',
      },
    ],
  },
  {
    name: 'system',
    icon: 'settingOutlined',
    path: '/system',
    access: 'system',
    routes: [
      {
        name: 'system-user',
        path: 'system-user',
        component: './System/SystemUser',
      },
      {
        name: 'system-role',
        path: 'system-role',
        component: './System/SystemRole',
      },
      {
        name: 'system-resource',
        path: 'system-resource',
        component: './System/SystemResource',
      },
    ],
  },
  {
    name: 'operation-log',
    icon: 'fileTextOutlined',
    path: '/operation-log',
    component: './OperationLog',
    access: 'operation-log',
  },
]
