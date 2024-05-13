import React, { useEffect, useState } from 'react'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import RoleTable from './c-cpns/RoleTable'
import RolePermissions from './c-cpns/RolePermissions'
import { Button, message } from 'antd'
import { getMenuKeysByRoleId, updateMenusByRoleId } from '@/services/modules/roles.service'

const SystemRole: React.FC = () => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [curRoleId, setCurRoleId] = useState<number>()

  // 根据当前选中的角色id获取菜单
  useEffect(() => {
    if (!curRoleId) return
    getMenuKeysByRoleId(curRoleId).then((res) => {
      res.success && setCheckedKeys(res.data)
    })
  }, [curRoleId])

  function handleRowClick(roleId: number) {
    setCurRoleId(roleId)
  }

  async function handleSaveMenu() {
    const res = await updateMenusByRoleId(curRoleId!, checkedKeys)
    res.success ? message.success('更新成功') : message.error(res.msg)
  }

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard>
          <RoleTable onClickRow={handleRowClick} />
        </ProCard>

        <ProCard
          colSpan={6}
          title="菜单分配"
          headerBordered
          extra={
            <Button type="primary" onClick={handleSaveMenu} size="small" disabled={!curRoleId}>
              保存
            </Button>
          }
        >
          <RolePermissions checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default SystemRole
