import {
  IArticle,
  deleteArticleById,
  getArticleList,
  updateArticleById,
} from '@/services/modules/articles.service'
import type { ActionType } from '@ant-design/pro-components'
import { ProTable, PageContainer, type ColumnsState } from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import columns from './columns'

const ArticleList: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    tags: {
      show: false,
      order: 0,
    },
    categoryId: {
      show: false,
      order: 0,
    },
  })

  return (
    <PageContainer>
      <ProTable<IArticle>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params, sort) => {
          return getArticleList(params, sort)
        }}
        rowKey="id"
        editable={{
          type: 'single',
          onSave: (_, record) => {
            const { isSticky, state, visibility } = record
            const modifiedData = { isSticky, state, visibility }
            return updateArticleById(record.id, modifiedData)
          },
          onDelete: (key) => {
            return deleteArticleById(Number(key))
          },
        }}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                createTime: null,
                updateTime: null,
              }
            }
            return values
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
      />
    </PageContainer>
  )
}

export default ArticleList
