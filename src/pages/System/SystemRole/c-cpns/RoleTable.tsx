import React, { useRef } from 'react'
import { ProTable } from '@ant-design/pro-components'
import { IRole, getRoleList } from '@/services/modules/roles.service'
import type { ActionType } from '@ant-design/pro-components'
import columns from '../columns'

const RoleTable: React.FC<{
  onClickRow: (val: number) => void
}> = ({ onClickRow }) => {
  const actionRef = useRef<ActionType>()

  return (
    <ProTable<IRole>
      columns={columns}
      request={(params, sort) => {
        return getRoleList(params as any, sort)
      }}
      rowKey="id"
      actionRef={actionRef}
      cardBordered
      editable={{
        type: 'single',
        // onSave: (_, record) => {
        //   const { id, name } = record
        //   return updateTagById(id, name)
        // },
        // onDelete: (key) => {
        //   return deleteTagById(Number(key))
        // },
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
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        // <TagCreateModal key="tagCateModal" reload={actionRef.current?.reload} />,
      ]}
      onRow={(record) => {
        return {
          onClick: () => {
            onClickRow(record.id)
          },
        }
      }}
    />
  )
}

export default RoleTable
