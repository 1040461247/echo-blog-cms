import React, { useRef } from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import {
  ICategory,
  deleteCategoryById,
  getCategoryList,
  updateCategoryById,
} from '@/services/modules/categories.service'
import columns from './columns'
import type { ActionType } from '@ant-design/pro-components'
import CategoryCreateModal from './c-cpns/CategoryCreateModal'

const Category: React.FC = () => {
  const actionRef = useRef<ActionType>()

  return (
    <PageContainer>
      <ProTable<ICategory>
        columns={columns}
        request={(params, sort) => {
          return getCategoryList(params as any, sort)
        }}
        rowKey="id"
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'single',
          onSave: (_, record) => {
            const { id, name } = record
            return updateCategoryById(id, name)
          },
          onDelete: (key) => {
            return deleteCategoryById(Number(key))
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
          <CategoryCreateModal key="createCateModal" reload={actionRef.current?.reload} />,
        ]}
      />
    </PageContainer>
  )
}

export default Category
