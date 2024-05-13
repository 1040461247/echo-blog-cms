import { IRole } from '@/services/modules/roles.service'
import { ProColumns } from '@ant-design/pro-components'

const columns: ProColumns<IRole>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: 38,
  },
  {
    title: '角色名',
    dataIndex: 'name',
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
    title: '角色等级',
    dataIndex: 'level',
    valueType: 'digit',
    sorter: true,
  },
  {
    title: '角色描述',
    dataIndex: 'desc',
    ellipsis: true,
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
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log(record)
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
    ],
  },
]

export default columns
