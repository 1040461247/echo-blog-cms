import { request } from '@umijs/max'
import { AM_UPLOAD, POST } from '../constants'

// Services
export async function uploadAvatarCover(articleId: number, formData: FormData) {
  return await request<API.BaseStructure>(`${AM_UPLOAD}/${articleId}/cover`, {
    method: POST,
    requestType: 'form',
    data: formData,
  })
}
