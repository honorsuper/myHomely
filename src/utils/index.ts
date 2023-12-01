import {useRouter} from "vue-router";

const router=useRouter()
/**
 * 退出登录
 */
export const handleLogout=()=>{
  localStorage.clear()
  router.push({
    name: 'login',
  })
}
