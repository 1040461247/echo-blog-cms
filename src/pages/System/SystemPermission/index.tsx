import React, { useRef } from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import {
  IPermission,
  getPermissionList,
  removePermissionById,
  updatePermissionById,
} from '@/services'
import columns from './columns'
import type { ActionType } from '@ant-design/pro-components'
import PermissionCreateModal from './c-cpns/PermissionCreateModal'
import diffObjects from '@/utils/diffObjects'

const SystemResource: React.FC = () => {
  const actionRef = useRef<ActionType>()

  return (
    <PageContainer>
      <ProTable<IPermission>
        columns={columns}
        request={(params, sort) => {
          return getPermissionList({ ...(params as any), sort })
        }}
        rowKey="id"
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'single',
          onSave: (key, record: any, originRow: any) => {
            const diffObj = diffObjects(record, originRow) as any
            return updatePermissionById(key as number, diffObj)
          },
          onDelete: (key) => {
            return removePermissionById(Number(key))
          },
        }}
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
          pageSize: 10,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <PermissionCreateModal key="createPermissionModal" reload={actionRef.current?.reload} />,
        ]}
      />
    </PageContainer>
  )
}

export default SystemResource
