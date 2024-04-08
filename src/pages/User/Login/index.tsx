import { Footer } from '@/components'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { history, SelectLang, useModel, Helmet } from '@umijs/max'
import { message } from 'antd'
import Settings from '../../../../config/defaultSettings'
import React from 'react'
import { flushSync } from 'react-dom'
import { createStyles } from 'antd-style'
import { ILoginParams, login } from '@/services'
import { USER_AUTH } from '@/constants'
import cache from '@/utils/cache'

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  }
})

const Lang = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  )
}

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const { styles } = useStyles()

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }))
      })
    }
  }
  const fetchMenuInfo = async () => {
    const menuInfo = await initialState?.fetchMenuInfo?.()
    if (menuInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          userMenus: menuInfo,
        }))
      })
    }
  }

  const handleSubmit = async (values: ILoginParams) => {
    try {
      // 登录
      const loginRes = await login(values)

      if (loginRes.data) {
        // 登录成功
        message.success('登录成功')
        cache.setCache(USER_AUTH, loginRes.data)
        // 获取用户及菜单信息
        await fetchMenuInfo()
        await fetchUserInfo()
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/')
      } else {
        // 登录失败
        message.error(loginRes.msg)
      }
    } catch (error) {
      message.error('登录失败，请重试')
    }
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>登录页 - {Settings.title}</title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="Echo Blog CMS"
          subTitle="欢迎来到EchoBlogCMS"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as ILoginParams)
          }}
        >
          <ProFormText
            name="name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
