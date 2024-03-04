import React, { useCallback, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import MdEditor from '@/components/MdEditor/MdEditor'
import { Button, Form } from 'antd'
import { SaveOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons'
import ArticleSettingModal, { IArticleSettingFormData } from './c-cpns/ArticleSettingModal'

const CreateArtilce: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [form] = Form.useForm<IArticleSettingFormData>()

  // Handles
  const handleSaveSetting = useCallback(async (formData: IArticleSettingFormData) => {
    console.log('finish', formData)
  }, [])

  return (
    <PageContainer
      className="overflow-hidden -mt-8 -mb-16"
      footer={[
        <Button key="setting" icon={<SettingOutlined />} onClick={() => setIsDrawerOpen(true)}>
          设置
        </Button>,
        <Button key="save" icon={<SaveOutlined />}>
          保存
        </Button>,
        <Button key="publish" type="primary" size="large" icon={<SendOutlined />}>
          发布
        </Button>,
      ]}
      header={{
        title: false,
        breadcrumbRender: () => false,
      }}
    >
      <MdEditor className="-mx-10" />

      <ArticleSettingModal
        isOpen={isDrawerOpen}
        onFinish={handleSaveSetting}
        onOpenChange={setIsDrawerOpen}
        form={form}
      />
    </PageContainer>
  )
}

export default CreateArtilce
