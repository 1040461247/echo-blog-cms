import { IPermission, TPermissionAction } from '@/services'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

export const stateEnum = {
  0: {
    text: '未启用',
    status: 'Error',
  },
  1: {
    text: '启用',
    status: 'Success',
  },
}

export enum IActionEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELET = 'DELETE',
  PATCH = 'PATCH',
}

const columns: ProColumns<IPermission>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: 38,
  },
  {
    title: '资源路径',
    dataIndex: 'url',
    width: 150,
    copyable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '资源名称',
    dataIndex: 'name',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, entity) => {
      const mapActionToColor: Record<TPermissionAction, string> = {
        GET: 'blue',
        POST: 'green',
        PUT: 'orange',
        DELETE: 'red',
        PATCH: 'cyan',
      }
      return (
        <Tag key={entity.id} color={mapActionToColor[entity.action]}>
          {entity.action}
        </Tag>
      )
    },
    valueEnum: IActionEnum,
  },
  {
    title: '标记',
    dataIndex: 'mark',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '标记名',
    dataIndex: 'markName',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    tooltip: '该资源是否启用',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未启用',
        status: 'Error',
      },
      1: {
        text: '启用',
        status: 'Success',
      },
    },
  },
  {
    title: '鉴权',
    dataIndex: 'authentication',
    tooltip: '访问该资源是否需要身份验证',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'select',
    valueEnum: {
      0: {
        text: '否',
        status: 'Error',
      },
      1: {
        text: '是',
        status: 'Success',
      },
    },
  },
  {
    title: '授权',
    dataIndex: 'authorization',
    tooltip: '访问该资源是否需要授权',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'select',
    valueEnum: {
      0: {
        text: '否',
        status: 'Error',
      },
      1: {
        text: '是',
        status: 'Success',
      },
    },
  },
  {
    title: '资源描述',
    dataIndex: 'description',
    valueType: 'textarea',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        if (value) {
          return {
            createTime: {
              startTime: value[0],
              endTime: value[1],
            },
          }
        }
      },
    },
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        if (value) {
          return {
            updateTime: {
              startTime: value[0],
              endTime: value[1],
            },
          }
        }
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
    ],
  },
]

export default columns
