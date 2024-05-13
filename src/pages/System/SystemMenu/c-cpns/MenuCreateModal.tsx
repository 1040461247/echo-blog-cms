import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormRadio, ProFormText, ProFormDigit } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import React from 'react'

// Types
export interface ICateForm {
  tag: string
}

const MenuCreateModal: React.FC<{
  reload: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined
}> = ({ reload }) => {
  const [form] = Form.useForm<ICateForm>()

  return (
    <ModalForm<ICateForm>
      title="新增菜单"
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
          console.log(values)
          reload?.()
          // const res = await createTag(values.tag)
          // if (res.success) {
          //   message.success('新增成功')
          //   reload?.()
          //   return true
          // }
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
      <ProFormRadio.Group
        name="type"
        label="选择菜单类型"
        radioType="button"
        fieldProps={{
          defaultValue: 'dir',
        }}
        options={[
          {
            label: '目录',
            value: 'dir',
          },
          {
            label: '菜单',
            value: 'menu',
          },
          {
            label: '按钮',
            value: 'btn',
          },
        ]}
      />
      <ProFormText name="name" label="菜单名称" placeholder="输入名称" />
      <ProFormDigit name="sort" label="菜单排序" min={0} />
      <ProFormText name="permission" label="权限标识" placeholder="输入权限标识" />
      <ProFormText name="path" label="菜单路径" placeholder="输入菜单路径" />
      <ProFormRadio.Group
        name="hidden"
        label="是否隐藏"
        radioType="button"
        fieldProps={{
          defaultValue: 0,
        }}
        options={[
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 0,
          },
        ]}
      />
    </ModalForm>
  )
}

export default MenuCreateModal
