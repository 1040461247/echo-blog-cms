// const menuList = [
//   'dashboard',
//   'article',
//   'category',
//   'tag',
//   'comment',
//   'friend',
//   'system',
//   'operation-log',
// ]
const menuList = [
  {
    id: 1,
    name: 'dashboard',
  },
  {
    id: 2,
    name: 'article',
  },
  {
    id: 3,
    name: 'article-list',
    parentId: 2,
  },
  {
    id: 4,
    name: 'create-article',
    parentId: 2,
  },
  {
    id: 5,
    name: 'article-attachment',
    parentId: 2,
  },
  {
    id: 6,
    name: 'category',
  },
  {
    id: 7,
    name: 'tag',
  },
  {
    id: 8,
    name: 'comment',
  },
  {
    id: 9,
    name: 'friend',
  },
  {
    id: 10,
    name: 'friend-list',
    parentId: 9,
  },
  {
    id: 11,
    name: 'friend-apply',
    parentId: 9,
  },
  {
    id: 12,
    name: 'system',
  },
  {
    id: 13,
    name: 'system-user',
    parentId: 12,
  },
  {
    id: 14,
    name: 'system-role',
    parentId: 12,
  },
  {
    id: 15,
    name: 'system-resource',
    parentId: 12,
  },
  {
    id: 16,
    name: 'operation-log',
  },
]

export default menuList
