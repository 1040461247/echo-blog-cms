import React, { useRef } from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import columns from './columns'
import type { ActionType } from '@ant-design/pro-components'
import TagCreateModal from './c-cpns/TagCreateModal'
import { ITag, deleteTagById, getTagList, updateTagById } from '@/services/modules/tags.service'

const Tag: React.FC = () => {
  const actionRef = useRef<ActionType>()

  return (
    <PageContainer>
      <ProTable<ITag>
        columns={columns}
        request={(params, sort) => {
          return getTagList(params as any, sort)
        }}
        rowKey="id"
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'single',
          onSave: (_, record) => {
            const { id, name } = record
            return updateTagById(id, name)
          },
          onDelete: (key) => {
            return deleteTagById(Number(key))
          },
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
        toolBarRender={() => [
          <TagCreateModal key="tagCateModal" reload={actionRef.current?.reload} />,
        ]}
      />
    </PageContainer>
  )
}

export default Tag
