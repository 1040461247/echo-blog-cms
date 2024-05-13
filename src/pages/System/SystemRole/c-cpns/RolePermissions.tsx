import React, { useEffect, useState } from 'react'
import { Tree } from 'antd'
import { IMenu, getMenuList } from '@/services'
import findNodeById from '@/utils/findNodeById'

const RolePermissions: React.FC<{
  checkedKeys: React.Key[]
  setCheckedKeys: (val: string[]) => void
}> = ({ checkedKeys, setCheckedKeys }) => {
  const [treeData, setTreeData] = useState<any[]>([])

  function listMapTree(list: IMenu[]) {
    // array<{key, title, children, [disabled, selectable]}>
    return list.map((item) => ({
      key: item.id,
      title: item.name,
      children: item.hasChildren ? [] : null,
      isLeaf: !item.hasChildren,
    }))
  }

  useEffect(() => {
    getMenuList({ topMenu: true }).then((res) => {
      if (res.success) {
        const tree = listMapTree(res.data)
        setTreeData(tree)
      }
    })
  }, [])

  const onLoadData = async ({ key }: any) => {
    const childList = await getMenuList({ pid: key })
    const newTree = [...treeData]

    if (childList.success) {
      newTree.forEach((item) => {
        const node = findNodeById(item, key, 'key')
        if (node) {
          console.log(item, key)
          node.children = listMapTree(childList.data)
          return
        }
      })

      setTreeData(newTree)
    }

    return Promise.resolve()
  }

  function handleCheck(checkedKeys: any) {
    setCheckedKeys(checkedKeys)
  }

  return (
    <div className="role=permissions">
      <Tree
        checkable
        treeData={treeData}
        loadData={onLoadData}
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
        blockNode
        selectable={false}
      />
    </div>
  )
}

export default RolePermissions
