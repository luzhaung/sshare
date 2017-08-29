/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午10:26
 */


export const Regulars = {
    reg_empty: /^\s*$/,
    reg_mobile: /(^0?[1][34578][\d]{9}$)|(^0[1-9][\d]{1,2}[- ]?[\d]{7,8}[-| ]?[\d]*$)/,
    reg_email: /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/,
    reg_password: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/,
};