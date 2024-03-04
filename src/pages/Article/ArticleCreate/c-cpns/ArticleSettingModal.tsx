import React from 'react'
import {
  DrawerForm,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormTreeSelect,
  ProFormSwitch,
} from '@ant-design/pro-components'
import { FormInstance } from 'antd/lib'
import { getCategoryList } from '@/services/modules/categories.service'
import dataMapOptions from '@/utils/dataMapOptions'
import { getTagList } from '@/services/modules/tags.service'

// Types
export interface IArticleSettingFormData {
  title: string
  description: string
  coverImg: string
  category: number
  tags: number[]
  isSticky: boolean
}

const ArticleSettingModal: React.FC<{
  isOpen: boolean
  onFinish: (formData: IArticleSettingFormData) => Promise<boolean | void>
  onOpenChange: (visible: boolean) => void
  form: FormInstance<IArticleSettingFormData>
}> = ({ isOpen, onFinish, onOpenChange, form }) => {
  return (
    <DrawerForm<IArticleSettingFormData>
      title="文章设置"
      open={isOpen}
      onOpenChange={onOpenChange}
      form={form}
      autoFocusFirstInput
      submitTimeout={2000}
      onFinish={onFinish}
      width={400}
    >
      <ProFormText
        name="title"
        label="标题"
        placeholder="请输入标题"
        rules={[{ required: true, message: '请输入标题' }]}
      />

      <ProFormTextArea
        rules={[{ required: true, message: '请输入描述' }]}
        name="description"
        label="内容概述"
        placeholder="请输入描述"
      />

      <ProFormUploadButton
        name="coverImg"
        label="文章封面"
        max={1}
        fieldProps={{
          name: 'cover',
        }}
        action="/upload.do"
        extra="请选择文章封面配图"
      />

      <ProFormSelect
        name="category"
        label="文章分类"
        request={async () => {
          const { data } = await getCategoryList()
          return dataMapOptions(data, 'name')
        }}
        placeholder="请选择分类"
        rules={[{ required: true, message: '请选择分类' }]}
      />

      <ProFormTreeSelect
        name="tags"
        label="文章标签"
        request={async () => {
          const { data } = await getTagList()
          return dataMapOptions(data, 'name')
        }}
        placeholder="请选择标签"
        rules={[{ required: true, message: '请选择标签' }]}
        fieldProps={{ multiple: true }}
      />

      <ProFormSwitch name="isSticky" label="是否置顶" />
    </DrawerForm>
  )
}

export default ArticleSettingModal
