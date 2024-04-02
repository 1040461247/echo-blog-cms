import { createCategory } from '@/services/modules/categories.service'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import React from 'react'

// Types
export interface ICateForm {
  category: string
}

const CategoryCreateModal: React.FC<{
  reload: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined
}> = ({ reload }) => {
  const [form] = Form.useForm<ICateForm>()

  return (
    <ModalForm<ICateForm>
      title="新增分类"
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
          const res = await createCategory(values.category)
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
      <ProFormText
        name="category"
        label="分类名称"
        tooltip="最短为 2 位"
        placeholder="请输入名称"
        rules={[
          { required: true, message: '请输入分类名称' },
          { min: 2, message: '最短为两位' },
        ]}
      />
    </ModalForm>
  )
}

export default CategoryCreateModal
