import { ARTICLE_LIST_PATH } from '@/constants'
import { ICategory } from '@/services/modules/categories.service'
import { ProColumns } from '@ant-design/pro-components'

const columns: ProColumns<ICategory>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: 48,
  },
  {
    title: '标签名',
    dataIndex: 'name',
    copyable: true,
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
    title: '关联文章数',
    dataIndex: 'articleCount',
    valueType: 'digit',
    editable: false,
    hideInSearch: true,
    sorter: true,
    width: '10%',
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
          console.log(record)
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <a href={`${ARTICLE_LIST_PATH}?tags=${record.id}`} rel="noopener noreferrer" key="view">
        查看关联文章
      </a>,
    ],
  },
]

export default columns
