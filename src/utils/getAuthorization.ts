import { USER_AUTH } from '@/constants'
import cache from './cache'

export default function getAuthorization() {
  return cache.getCache(USER_AUTH)?.token
}
