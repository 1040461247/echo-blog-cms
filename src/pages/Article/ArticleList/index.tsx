import { IArticle, getArticleList } from '@/services/modules/articles.service'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType } from '@ant-design/pro-components'
import { ProTable, type ColumnsState } from '@ant-design/pro-components'
import { Button, Dropdown } from 'antd'
import { useRef, useState } from 'react'
import columns from './columns'

const ArticleList: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    tags: {
      show: false,
      order: 0,
    },
    categories: {
      show: false,
      order: 0,
    },
  })

  return (
    <ProTable<IArticle>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const { current, pageSize } = params
        return await getArticleList(current, pageSize)
      }}
      editable={{
        type: 'multiple',
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
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            }
          }
          return values
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => {
          console.log(page)
        },
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
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  )
}

export default ArticleList
