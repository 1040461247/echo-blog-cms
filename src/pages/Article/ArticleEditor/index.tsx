import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import MdEditor from '@/components/MdEditor/MdEditor'
import { Button, message } from 'antd'
import { SaveOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons'
import ArticleSettingModal, { IArticleSettingFormData } from './c-cpns/ArticleSettingModal'
import Vditor from 'vditor'
import { isObjectEmpty, objectFilter } from '@/utils/objectUtils'
import {
  IArticleDetail,
  ISaveArticleParams,
  getArticleById,
  saveArticle,
  uploadAvatarCover,
} from '@/services'
import { useSearchParams } from '@umijs/max'
import genUuid from '@/utils/genUuid'

export const ARTICLE_ID = 'articleId'

const CreateArtilce: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [formData, setFormData] = useState<IArticleSettingFormData>()
  const [initialData, setInitialData] = useState<IArticleDetail>()
  const [vditor, setVditor] = useState<Vditor>()
  const [mark, setMark] = useState<string>()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSettingData = useMemo(
    () => ({
      title: initialData?.title,
      description: initialData?.description,
      coverUrl: initialData?.coverUrl,
      categoryId: initialData?.category.id,
      tags: initialData?.tags.map((item) => item.id),
      isSticky: initialData?.isSticky === '1',
    }),
    [initialData],
  )

  useEffect(() => {
    const articleId = searchParams.get(ARTICLE_ID)
    if (articleId) {
      // 获取要编辑的文章内容
      getArticleById(Number(articleId)).then((articleData) => {
        setInitialData(articleData.data)
      })
    } else {
      setMark(genUuid())
    }
  }, [])

  useEffect(() => {
    // 编辑文章时，设置文章初始内容
    if (initialData?.content && vditor) {
      vditor.setValue(initialData.content)
    }
    return () => {
      vditor?.clearCache()
    }
  }, [initialData, vditor])

  // Handles
  const handleSettingSave = useCallback(async (formData: IArticleSettingFormData) => {
    setFormData(formData)
    return true
  }, [])

  async function handleSave() {
    if (isObjectEmpty(formData)) {
      message.error('请完善文章设置')
      setIsDrawerOpen(true)
      return
    }

    // 保存文章
    const content = vditor?.getValue()
    const articleId = searchParams.get(ARTICLE_ID)
    const articleData = objectFilter(
      { ...formData, content, state: '0', visibility: '0', id: articleId, mark },
      ['coverImg'],
    ) as ISaveArticleParams

    const { success, msg, data } = await saveArticle(articleData)
    if (success) {
      message.success(msg)
      if (data?.insertId) {
        setSearchParams({ [ARTICLE_ID]: String(data?.insertId) })
      }
    } else {
      message.error(msg)
    }

    // 上传文章封面
    const curAtcId = Number(articleId) ?? data?.insertId
    const isCheckedCover = formData?.coverImg?.length > 0
    if (isCheckedCover && curAtcId) {
      const coverFormData = new FormData()
      const file = formData?.coverImg[0].originFileObj
      coverFormData.append('cover', file)

      const res = await uploadAvatarCover(curAtcId, coverFormData)
      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    }
  }

  return (
    <PageContainer
      className="overflow-hidden -mt-8 -mb-16"
      footer={[
        <Button key="save" icon={<SaveOutlined />} onClick={handleSave}>
          保存
        </Button>,
        <Button
          key="setting"
          type="primary"
          ghost
          icon={<SettingOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          设置
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
      <MdEditor className="-mx-10" setVditor={setVditor} mark={mark} />

      <ArticleSettingModal
        isOpen={isDrawerOpen}
        onFinish={handleSettingSave}
        onOpenChange={setIsDrawerOpen}
        initialValues={initialSettingData}
      />
    </PageContainer>
  )
}

export default CreateArtilce
