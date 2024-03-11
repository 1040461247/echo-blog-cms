import { ARTICLE_ID } from '@/pages/Article/ArticleEditor'
import { AM_UPLOAD } from '@/services/constants'

import getAuthorization from '@/utils/getAuthorization'
import { useSearchParams } from '@umijs/max'
import React, { memo, useEffect, useState } from 'react'
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

const MdEditor: React.FC<{
  className?: string
  setVditor: (v: Vditor) => void
  mark?: string
}> = ({ className, setVditor, mark }) => {
  const [searchParams] = useSearchParams()
  const [uploadUrl, setUploadUrl] = useState<{ basePath: string; queryStr: string }>()

  useEffect(() => {
    setUploadUrl({
      basePath: `${API_BASE_URL_ENV}${AM_UPLOAD}`,
      queryStr: searchParams.get(ARTICLE_ID)
        ? `?articleId=${searchParams.get(ARTICLE_ID)}`
        : `?mark=${mark}`,
    })
  }, [searchParams, mark])

  useEffect(() => {
    const vditor = new Vditor('vditor', {
      after: () => {
        setVditor(vditor)
        vditor.setValue('')
      },
      height: 'calc(100vh - 56px - 65px)',
      placeholder: 'Waiting for input...',
      counter: {
        enable: true,
      },
      preview: {
        hljs: {
          lineNumber: true,
        },
      },
      outline: {
        enable: true,
        position: 'right',
      },
      upload: {
        url: `${uploadUrl?.basePath}/illustration${uploadUrl?.queryStr}`,
        linkToImgUrl: `${uploadUrl?.basePath}/illustration/offsite${uploadUrl?.queryStr}`,
        linkToImgFormat(responseText: string) {
          const resJson = JSON.parse(responseText)
          if (resJson.success) {
            resJson.code = 0
          }
          return JSON.stringify(resJson)
        },
        headers: {
          Authorization: getAuthorization(),
        },
        accept: 'image/*',
        multiple: false,
        fieldName: 'illustration',
      },
    })
  }, [uploadUrl])

  return <div className={`vditor ${className}`} id="vditor" />
}

export default memo(MdEditor)
