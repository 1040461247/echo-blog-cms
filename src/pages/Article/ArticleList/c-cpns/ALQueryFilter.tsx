import React from 'react'
import { ProFormDatePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'

const ALQueryFilter: React.FC = () => {
  return (
    <div className="al-query-filter">
      <QueryFilter defaultCollapsed split>
        <ProFormText name="name" label="应用名称" />
        <ProFormDatePicker name="createDate" label="创建时间" />
        <ProFormText name="status" label="应用状态" />
        <ProFormDatePicker name="replyDate" label="响应日期" />
        <ProFormDatePicker name="startDate" label="创建时间" />
        <ProFormDatePicker name="endDate" label="结束时间" />
      </QueryFilter>
    </div>
  )
}

export default ALQueryFilter
