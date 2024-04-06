import { TPermissionAction, createPermission } from '@/services'
import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormSwitch,
  ProForm,
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import React from 'react'
import { IActionEnum } from '../columns'

// Types
export interface IPermissionForm {
  url: string
  name: string
  action: TPermissionAction
  mark: string
  markName: string
  state: boolean
  authentication: boolean
  authorization: boolean
}

const PermissionCreateModal: React.FC<{
  reload: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined
}> = ({ reload }) => {
  const [form] = Form.useForm<IPermissionForm>()

  return (
    <ModalForm<IPermissionForm>
      title="新增资源"
      form={form}
      width={500}
      trigger={
        <Button type="primary" className="flex items-center">
          <PlusOutlined />
          新建
        </Button>
      }
      onFinish={async (values) => {
        try {
          const res = await createPermission(values)
          if (res.success) {
            message.success('新增成功')
            reload?.()
            return true
          }
        } catch (error) {
          console.log(error)
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
    >
      <ProForm.Group>
        <ProFormText
          name="url"
          label="资源路径"
          placeholder="请输入"
          rules={[{ required: true, message: '请输入资源路径' }]}
        />
        <ProFormText
          name="name"
          label="资源名称"
          placeholder="请输入"
          rules={[{ required: true, message: '请输入资源名称' }]}
        />
      </ProForm.Group>

      <ProFormSelect
        name="action"
        label="操作"
        placeholder="请选择"
        rules={[{ required: true, message: '请选择操作' }]}
        valueEnum={IActionEnum}
      />

      <ProForm.Group>
        <ProFormText
          name="mark"
          label="标记"
          placeholder="请输入"
          rules={[{ required: true, message: '请输入标记' }]}
        />
        <ProFormText
          name="markName"
          label="标记名"
          placeholder="请输入"
          rules={[{ required: true, message: '请输入标记名' }]}
        />
      </ProForm.Group>

      <ProFormTextArea name="description" label="资源描述" placeholder="请输入" />

      <ProForm.Group>
        <ProFormSwitch
          name="state"
          label="状态"
          tooltip="该资源是否启用"
          fieldProps={{
            checkedChildren: '启用',
            unCheckedChildren: '未启用',
            defaultChecked: true,
          }}
        />
        <ProFormSwitch
          name="authentication"
          label="鉴权"
          tooltip="访问该资源是否需要身份验证"
          fieldProps={{
            checkedChildren: '是',
            unCheckedChildren: '否',
            defaultChecked: true,
          }}
        />
        <ProFormSwitch
          name="authorization"
          label="授权"
          tooltip="访问该资源是否需要授权"
          fieldProps={{
            checkedChildren: '是',
            unCheckedChildren: '否',
            defaultChecked: true,
          }}
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default PermissionCreateModal
