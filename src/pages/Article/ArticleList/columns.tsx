import { IArticle } from '@/services'
import { getCategoryList } from '@/services/modules/categories.service'
import { getTagList } from '@/services/modules/tags.service'
import dataMapOptions from '@/utils/dataMapOptions'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'
import { TableDropdown } from '@ant-design/pro-components'

const columns: ProColumns<IArticle>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
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
    title: '简述',
    dataIndex: 'description',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '分类',
    dataIndex: ['category', 'name'],
    ellipsis: true,
    key: 'categoryId',
    valueType: 'select',
    request: async () => {
      const { data } = await getCategoryList()
      return dataMapOptions(data, 'name')
    },
    render: (_, entity) => {
      return (
        <Tag key={entity.category.id} color="red">
          {entity.category.name}
        </Tag>
      )
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: true,
    },
    request: async () => {
      const { data } = await getTagList()
      return dataMapOptions(data, 'name')
    },
    render: (_, entity) => {
      return entity.tags?.map((item) => (
        <Tag key={item.id} color="orange">
          {item.name}
        </Tag>
      ))
    },
  },
  {
    title: '置顶',
    dataIndex: 'isSticky',
    filters: true,
    onFilter: true,
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
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    tooltip: '文章发布状态',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未发布',
        status: 'Error',
      },
      1: {
        text: '已发布',
        status: 'Success',
      },
    },
  },
  {
    title: '可见性',
    dataIndex: 'visibility',
    filters: true,
    onFilter: true,
    tooltip: '文章可见范围',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '仅自己可见',
        status: 'Error',
      },
      1: {
        text: '公开',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
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
      <a href="#" target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
]

export default columns
