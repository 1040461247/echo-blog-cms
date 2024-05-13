export default function findNodeById(root: any, targetId: number, idFiled = 'id') {
  // 辅助函数，用于递归遍历树
  function traverse(node: any): any | null {
    // 检查当前节点的ID是否匹配
    if (node[idFiled] === targetId) {
      // 如果匹配，返回当前节点
      return node
    }

    // 检查当前节点的子节点
    if (node.children && node.children.length > 0) {
      // 遍历子节点
      for (let child of node.children) {
        // 递归调用traverse函数
        const foundNode = traverse(child)
        if (foundNode) {
          // 如果在子节点中找到匹配的节点，返回它
          return foundNode
        }
      }
    }

    // 如果没有找到匹配的节点，返回null
    return null
  }

  // 从根节点开始遍历
  return traverse(root)
}
