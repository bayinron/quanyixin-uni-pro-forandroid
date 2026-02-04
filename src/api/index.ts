import { http } from '@/utils/request';
import type { LoginData, SearchRequest } from './types';

// 接口返回数据类型定义
interface BaseResponse<T = any> {
    result: string;
    msg?: string;
    data?: T;
}

interface UserInfo {
    usename: string;
    bankname: string;
    bankpic: string;
}

interface TradeRecord {
    fen: number;
    days: number;
    endtime: string;
    dd_name: string;
    moneys: number;
    sid: string;
    isok: string;
}

interface LoginParams {
    UserName: string;
    PassWord: string;
}

interface RegisterParams {
    Mobile: string;
    Password: string;
    SMSValidateCode: string;
    bianhao: string;
}

// API 函数定义
export function getpassword(mobile: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'sms.php?tel=' + mobile
    });
}

export function userlogin(data: any) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'login.php?usename=' + data.usename + '&usepwd=' + data.usepwd
    });
}

export function userregister(data: RegisterParams) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'reg.php?usename=' + data.Mobile + '&usepwd=' + data.Password + '&okpwd=' + data.Password + '&yzm=' + data.SMSValidateCode + '&bianhao=' + data.bianhao
    });
}

export function modicash(newpwd: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'pay_pwd.php?newpwd=' + newpwd + '&okpwd=' + newpwd
    });
}

export function addaddress(name: string, phone: string, diqu: string, dizhi: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'shop_dizhi.php?name=' + name + '&phone=' + phone + '&diqu=' + diqu + '&dizhi=' + dizhi
    });
}

export function editaddress(name: string, phone: string, diqu: string, dizhi: string, did: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'shop_dizhi_mod.php?name=' + name + '&phone=' + phone + '&diqu=' + diqu + '&dizhi=' + dizhi + '&did=' + did
    });
}

export function modipaypwd(newpwd: string, usepwd: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'mod_pay_pwd.php?newpwd=' + newpwd + '&okpwd=' + newpwd + '&usepwd=' + usepwd
    });
}

export function getrankings() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'team.php'
    });
}

export function getbanner() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'banner.php'
    });
}

export function getIndex() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'index.php'
    });
}

export function getChatUrl() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'kefu_url.php'
    });
}

export function getShop() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'shop.php'
    });
}

export function getGreat() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'great.php'
    });
}

export function postQiandao() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'jifen_qiandao.php'
    });
}

export function postDaihuan() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'jifen_daihuan.php'
    });
}

export function postYaoqing() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'jifen_yaoqing.php'
    });
}

export function postFuli() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'jifen_fuli.php'
    });
}

export function getCj() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'choujiang.php'
    });
}

export function getRecordDetail(sid: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'record_xiangqing.php?sid=' + sid
    });
}

export function postCj() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'choujiang_ok.php'
    });
}

export function postShop(id: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'shop_ing.php?id=' + id
    });
}

export function postGreat(bianhao: string, moneys: number) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'great_add.php?bianhao=' + bianhao + '&moneys=' + moneys
    });
}

export function intobalance(money: number) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'yuebao_zhuanru.php?moneys=' + money
    });
}

export function outbalance(money: number) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'yuebao_zhuanchu.php?moneys=' + money
    });
}

export function getZixun(id: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'zixun.php?id=' + id
    });
}

export function getbankinfo() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'usebank.php'
    });
}

export function getNotice(lx: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'gonggao.php?lx=' + lx
    });
}

export function getHuodong() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'active.php'
    });
}

export function getHuodongDetail(id: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'active_info.php?id=' + id
    });
}

export function getposition() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'yuebao.php'
    });
}

export function withdrawals(bankcode: string, bankname: string, bankuser: string, moneys: number, usepwd: string, tday: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'tixian.php?bankcode=' + bankcode + '&bankname=' + bankname + '&bankuser=' + bankuser + '&moneys=' + moneys + '&usepwd=' + encodeURIComponent(usepwd) + '&tday=' + tday
    });
}

export function withdrawalsusdt(usdtlx: string, usdt: string, moneys: number, usepwd: string, tday: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'tixian_usdt.php?usdtlx=' + usdtlx + '&usdt=' + usdt + '&moneys=' + moneys + '&mima=' + encodeURIComponent(usepwd) + '&tday=' + tday
    });
}

export function getuserdetail() {
    return http<BaseResponse<UserInfo>>({
        method: 'GET',
        url: 'my.php'
    });
}

export function getaddress() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'shop_dizhi_ok.php'
    });
}

export function getstream() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_chong.php'
    });
}

export function gettxstream() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_tixian.php'
    });
}

export function getszstream() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_mx.php'
    });
}

export function getlicaimx() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_licai.php'
    });
}

export function gethdstream() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_huodong.php'
    });
}

export function getjfstream() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'record_jifen.php'
    });
}

export function getAuthentication() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'certification.php'
    });
}

interface AuthenticationData {
    realname: string;
    usecode: string;
    con?: string;
    con1?: string;
    bankcode: string;
    bankuser: string;
    bankname: string;
    bankadd: string;
}

export function authentication(data: AuthenticationData) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'certification_ok.php',
        data
    });
}

export function setfollow() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'qiandao.php'
    });
}

export function getStrade(lx: string) {
    return http<BaseResponse<{ ding: TradeRecord[] }>>({
        method: 'POST',
        url: 'record.php?lx=' + lx
    });
}

export function getRecord(status: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'recordche.php?status=' + status
    });
}

export function getContract(sid: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'record_hetong.php?sid=' + sid
    });
}

export function getInvest() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'invest.php'
    });
}

interface RechargeData {
    moneys: number;
    con: string;
}

export function bankRecharge( moneys: string, con: string, usdt: string, id: string) {
    return http<any>({
        method: 'POST',
        url: `chong.php`,
        data: {
            
            moneys,
            con,
            id,
            usdt
        }
    });
}

export function getXindaiTab() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'xindai_zhuanqu.php'
    });
}

export function getXindai(id: string, shuoming: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'xindai.php?id=' + id + '&lx=' + shuoming
    });
}

export function getZhanche(id: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'zhanche.php?id=' + id
    });
}

export function getLottery() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'choujiang.php'
    });
}

export function postLottery() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'choujiang_ok.php'
    });
}

export function getOrderInfo(bianhao: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'order.php?zqid=' + bianhao
    });
}
export function _getXmlist(zqid: string) {
    return http<any>({
        method: 'GET',
        url: `getxmlist.php?id=${zqid}`
    });
}
export function getOrderInfo2(bianhao: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'orderche.php?id=' + bianhao
    });
}

export function postOrder(zqid: string, days: number, moneys: number, lixi: number, zid: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'order_ok.php?zqid=' + zqid + '&days=' + days + '&moneys=' + moneys + '&lixi=' + lixi + '&zid=' + zid
    });
}

export function postOrder2(id: string, moneys: number, lixi: number) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'orderche_ok.php?zid=' + id + '&moneys=' + moneys + '&lixi=' + lixi
    });
}

export function getindexxx() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'index_msg.php'
    });
}

export function modifypwd(usepwd: string, newpwd: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'mod_pwd.php?usepwd=' + usepwd + '&newpwd=' + newpwd + '&okpwd=' + newpwd
    });
}

export function getXindaiTitle(id: string) {
    return http<BaseResponse>({
        method: 'GET',
        url: 'xindai_title.php?id=' + id
    });
}

export function getapistrade() {
    return http<BaseResponse>({
        method: 'POST',
        url: 'kefu_about.php'
    });
}

export function getHelpcon(id: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'kefu_about_info.php?id=' + id
    });
}

export function getAboutus() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'aboutus.php'
    });
}

export function forgetpwd(usename: string, yzm: string, usepwd: string) {
    return http<BaseResponse>({
        method: 'POST',
        url: 'forget.php?usename=' + usename + '&yzm=' + yzm + '&usepwd=' + usepwd + '&okpwd=' + usepwd
    });
}

//获取usdt的提现地址
export function gettrc20address( ) {
    return http<any>({
        method: 'GET',
        url: `trc20address.php?act=view`,
        
    });
}   
//添加usdt的提现地址
export function addtrc20address(usdt_trc20_address: string) {
    return http<any>({
        method: 'GET',
        url: `trc20address.php?act=add&usdt_trc20_address=${usdt_trc20_address}`
    });
}


export function getOneDh( zqid: string, id: string) {
    return http<any>({
        method: 'GET',
        url: `orderche.php?zqid=${zqid}&id=${id}`
    });
}
//获取签到配置
export function getSignSet() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'signset.php'
    });
}

export function _buypro( zqid: number, id: number, moneys: string, qishu: number,day:number,bankid:number) {
    return http<any>({
        method: 'POST',
        url: `buypro.php`,
        data: {
            zqid,
            id,
            moneys,
            qishu,
			day,
			bankid
        }
    });
}
//获取代还规则配置
export function getAck() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'ack.php'
    });
}
//获取人民币提现手续费
export function getTxfee() {
    return http<BaseResponse>({
        method: 'GET',
        url: 'txfee.php'
    });
}
