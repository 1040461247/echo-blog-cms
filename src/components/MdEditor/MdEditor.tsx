import { ARTICLE_ID } from '@/pages/Article/ArticleEditor'
import { AM_UPLOAD } from '@/services/constants'

import getAuthorization from '@/utils/getAuthorization'
import { useSearchParams } from '@umijs/max'
import React, { memo, useEffect } from 'react'
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

const MdEditor: React.FC<{
  className?: string
  setVditor: (v: Vditor) => void
  mark?: string
}> = ({ className, setVditor, mark }) => {
  const [searchParams] = useSearchParams()

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
        url: `${API_BASE_URL_ENV}${AM_UPLOAD}/illustration${
          searchParams.get(ARTICLE_ID)
            ? `?articleId=${searchParams.get(ARTICLE_ID)}`
            : `?mark=${mark}`
        }`,
        linkToImgUrl: `${API_BASE_URL_ENV}${AM_UPLOAD}/illustration/offsite${
          searchParams.get(ARTICLE_ID)
            ? `?articleId=${searchParams.get(ARTICLE_ID)}`
            : `?mark=${mark}`
        }`,
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
  }, [mark])

  return <div className={`vditor ${className}`} id="vditor" />
}

export default memo(MdEditor)
