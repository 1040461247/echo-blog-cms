import { IMenu } from '@/services'
import { ProColumns } from '@ant-design/pro-components'

const columns: ProColumns<IMenu>[] = [
  {
    title: '菜单标题',
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
    title: '排序',
    dataIndex: 'sort',
    hideInSearch: true,
  },

  {
    title: '权限标识',
    dataIndex: 'permission',
  },
  {
    title: '菜单路径',
    dataIndex: 'path',
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      dir: {
        text: '目录',
      },
      menu: {
        text: '菜单',
      },
      btn: {
        text: '按钮',
      },
    },
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '否',
        status: 'Success',
      },
      1: {
        text: '是',
        status: 'Error',
      },
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
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
    render: (_1, record, _2, action) => [
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
