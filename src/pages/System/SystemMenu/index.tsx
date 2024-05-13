import React, { useEffect, useRef, useState } from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { IMenu, deleteMenuById, getMenuList, updateMenuByID } from '@/services'
import columns from './columns'
import type { ActionType } from '@ant-design/pro-components'
import findNodeById from '@/utils/findNodeById'
import MenuCreateModal from './c-cpns/MenuCreateModal'

const SystemMenu: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [tableData, setTableData] = useState<IMenu[]>([])
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

  function menusMapTree(menus: IMenu[]) {
    const tree = menus.map((item) => {
      if (item.hasChildren) {
        item.children = []
      }
      return item
    })
    return tree
  }

  // 请求顶层菜单的数据
  useEffect(() => {
    getMenuList({ topMenu: true }).then((res) => {
      if (res.success) {
        const menuList = menusMapTree(res.data)
        setTableData(menuList)
      }
    })
  }, [])

  return (
    <PageContainer>
      <ProTable<IMenu>
        request={async (params) => {
          const reqParams: any = { ...params }
          const keys = Object.keys(reqParams)
          if (keys.length === 0) {
            reqParams.topMenu = true
          }
          const res = await getMenuList(reqParams)
          const menuList = menusMapTree(res.data)
          setTableData(menuList)
          setExpandedRowKeys([])

          return Promise.resolve({
            data: menuList,
            success: true,
          })
        }}
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'single',
          onSave: async (_, record) => {
            const { id, name, path, type, permission, sort, hidden } = record
            await updateMenuByID(id, { name, path, type, permission, sort, hidden })
            actionRef.current?.reload()
          },
          onDelete: async (key) => {
            await deleteMenuById(Number(key))
            actionRef.current?.reload()
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
        pagination={false}
        dateFormatter="string"
        toolBarRender={() => [
          <MenuCreateModal key="createMenuModal" reload={actionRef.current?.reload} />,
        ]}
        expandable={{
          expandRowByClick: true,
          expandedRowKeys: expandedRowKeys,
          onExpand: async (expanded, record) => {
            if (expanded && record.children?.length === 0) {
              const subMenu = await getMenuList({ pid: record.id })
              const newTableData = [...tableData]

              let target: IMenu | undefined
              newTableData.forEach((item) => {
                const node = findNodeById(item, record.id)
                if (node) {
                  target = node
                  return
                }
              })

              if (target) {
                target.children = subMenu.data
                setTableData(newTableData)
              }
            }
          },
          onExpandedRowsChange(expandedKeys) {
            setExpandedRowKeys(expandedKeys as string[])
          },
        }}
      />
    </PageContainer>
  )
}

export default SystemMenu
