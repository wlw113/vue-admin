

// 验证是否手机号
export function  validateUserPhone(value){
    let reg=/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    return !reg.test(value)?true:false;
};
export function validateCode(value)
{
    let reg=/^[0-9]{6}$/;
    return !reg.test(value)?true:false;
};