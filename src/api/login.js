import service from "@/utils/request";

/**获取验证码 */
export function getCode(data){
   return service.request({
        method:"post",
        url:"/getSms",
        data:data
    })
}
/**登录 */
export function userLogin(data){
    service.request({
        method:"post",
        url:"/userLogin",
        data:data
    })
}

/**注册 */