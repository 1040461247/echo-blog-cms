import { IArticle, getArticleList } from '@/services/modules/articles.service'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType } from '@ant-design/pro-components'
import { ProTable, type ColumnsState } from '@ant-design/pro-components'
import { Button } from 'antd'
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
    <ProTable<IArticle>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort) => {
        return await getArticleList(params, sort)
      }}
      editable={{
        type: 'single',
      }}
      columnsState={{
        value: columnsStateMap,
        onChange: setColumnsStateMap,
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
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
      headerTitle="文章列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload()
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  )
}

export default ArticleList
