import {
  ARTICLE_ATTACHMENT_PATH,
  ARTICLE_CREATE_PATH,
  ARTICLE_LIST_PATH,
  ARTICLE_PATH,
  CATEGORY_PATH,
  COMMENT_PATH,
  DASHBOARD_PATH,
  FRIEND_APPLY_PATH,
  FRIEND_LIST_PATH,
  FRIEND_PATH,
  OPERATION_LOG_PATH,
  SYSTEM_PATH,
  SYSTEM_RESOURCE_PATH,
  SYSTEM_ROLE_PATH,
  SYSTEM_USER_PATH,
  TAG_PATH,
  USER_LOGIN_PATH,
  USER_PATH,
} from '../src/constants'

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
    path: '/',
    redirect: DASHBOARD_PATH,
  },
  {
    path: ARTICLE_PATH,
    redirect: ARTICLE_LIST_PATH,
  },
  {
    path: FRIEND_PATH,
    redirect: FRIEND_LIST_PATH,
  },
  {
    path: SYSTEM_PATH,
    redirect: SYSTEM_USER_PATH,
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    path: USER_PATH,
    layout: false,
    routes: [
      {
        name: 'login',
        path: USER_LOGIN_PATH,
        component: './User/Login',
      },
    ],
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: DASHBOARD_PATH,
    component: './Dashboard',
    access: 'normalRouteFilter',
  },
  {
    name: 'article',
    icon: 'readOutlined',
    path: ARTICLE_PATH,
    access: 'normalRouteFilter',
    routes: [
      {
        name: 'article-list',
        path: ARTICLE_LIST_PATH,
        component: './Article/ArticleList',
        access: 'normalRouteFilter',
      },
      {
        name: 'create-article',
        path: ARTICLE_CREATE_PATH,
        component: './Article/ArticleCreate',
        access: 'normalRouteFilter',
      },
      {
        name: 'article-attachment',
        path: ARTICLE_ATTACHMENT_PATH,
        component: './Article/ArticleAttachment',
        access: 'normalRouteFilter',
      },
    ],
  },
  {
    name: 'category',
    icon: 'folderOutlined',
    path: CATEGORY_PATH,
    component: './Category',
    access: 'normalRouteFilter',
  },
  {
    name: 'tag',
    icon: 'tag',
    path: TAG_PATH,
    component: './Tag',
    access: 'normalRouteFilter',
  },
  {
    name: 'comment',
    icon: 'comment',
    path: COMMENT_PATH,
    component: './Comment',
    access: 'normalRouteFilter',
  },

  {
    name: 'friend',
    icon: 'linkOutlined',
    path: FRIEND_PATH,
    access: 'normalRouteFilter',
    routes: [
      {
        name: 'friend-list',
        path: FRIEND_LIST_PATH,
        component: './Friend/FriendList',
        access: 'normalRouteFilter',
      },
      {
        name: 'friend-apply',
        path: FRIEND_APPLY_PATH,
        component: './Friend/FriendApply',
        access: 'normalRouteFilter',
      },
    ],
  },
  {
    name: 'system',
    icon: 'settingOutlined',
    path: SYSTEM_PATH,
    access: 'normalRouteFilter',
    routes: [
      {
        name: 'system-user',
        path: SYSTEM_USER_PATH,
        component: './System/SystemUser',
        access: 'normalRouteFilter',
      },
      {
        name: 'system-role',
        path: SYSTEM_ROLE_PATH,
        component: './System/SystemRole',
        access: 'normalRouteFilter',
      },
      {
        name: 'system-resource',
        path: SYSTEM_RESOURCE_PATH,
        component: './System/SystemResource',
        access: 'normalRouteFilter',
      },
    ],
  },
  {
    name: 'operation-log',
    icon: 'fileTextOutlined',
    path: OPERATION_LOG_PATH,
    component: './OperationLog',
    access: 'normalRouteFilter',
  },
]
