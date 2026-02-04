import { http } from '../utils/request';

//获取短信验证码
export function getpassword(mobile: string) {
    return http<any>({
        method: 'GET',
        url: `sms.php?tel=${mobile}`
    });
}
//注册
export function userregister(data: any) {
    return http<any>({
        method: 'POST',
        url: `reg.php?usename=${data.Mobile}&usepwd=${data.Password}&okpwd=${data.Password}&yzm=${data.SMSValidateCode}&bianhao=${data.bianhao}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//注册2
export function userregister2(data: any) {
    return http<any>({
        method: 'POST',
        url: `register.php?usename=${data.Mobile}&usepwd=${data.Password}&okpwd=${data.Password}&yzm=${data.SMSValidateCode}&bianhao=${data.bianhao}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//登录
export function userlogin(data: any) {
    return http<any>({
        method: 'POST',
        url: `login.php?usename=${data.UserName}&usepwd=${data.PassWord}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function addaddress(name: string, phone: string, diqu: string, dizhi: string) {
    return http<any>({
        method: 'POST',
        url: `shop_dizhi.php?name=${name}&phone=${phone}&diqu=${diqu}&dizhi=${dizhi}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export function editaddress(name: string, phone: string, diqu: string, dizhi: string, did: string) {
    return http<any>({
        method: 'POST',
        url: `shop_dizhi_mod.php?name=${name}&phone=${phone}&diqu=${diqu}&dizhi=${dizhi}&did=${did}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//设置提现密码
export function setpaypwd(newpwd: string, okpwd: string) {
    return http<any>({
        method: 'POST',
        url: `mod_pay_pwd.php?newpwd=${newpwd}&okpwd=${okpwd}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//修改提现密码
export function modipaypwd(newpwd: string, usepwd: string | null = null) {
    return http<any>({
        method: 'POST',
        url: usepwd === null ? `mod_pay_pwd.php?newpwd=${newpwd}` : `mod_pay_pwd.php?newpwd=${newpwd}&okpwd=${newpwd}&usepwd=${usepwd}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//获取团队报表
export function getrankings() {
    return http<any>({
        method: 'POST',
        url: `team.php`
    });
}

//获取消息信息
export function getbanner() {
    return http<any>({
        method: 'GET',
        url: `banner.php`
    });
}
//获取首页
export function getIndex() {
    return http<any>({
        method: 'GET',
        url: `index.php`
    });
}

//获取投诉建议
export function getChatUrl() {
    return http<any>({
        method: 'GET',
        url: `kefu_url.php`
    });
}

export function getShop() {
    return http<any>({
        method: 'GET',
        url: `shop.php`
    });
}
//获取理财数据
export function getGreat() {
    return http<any>({
        method: 'POST',
        url: `great.php`
    });
}
//获取理财数据2
export function getLicai(data: any) {
    return http<any>({
        method: 'GET',
        url: `record_licai.php`,
        data: data
    });
}

export function postQiandao() {
    return http<any>({
        method: 'POST',
        url: `jifen_qiandao.php`
    });
}

export function postDaihuan() {
    return http<any>({
        method: 'POST',
        url: `jifen_daihuan.php`
    });
}

export function postYaoqing() {
    return http<any>({
        method: 'POST',
        url: `jifen_yaoqing.php`
    });
}

export function postFuli() {
    return http<any>({
        method: 'POST',
        url: `jifen_fuli.php`
    });
}

export function getCj() {
    return http<any>({
        method: 'POST',
        url: `choujiang.php`
    });
}

export function getRecordDetail(sid: string) {
    return http<any>({
        method: 'POST',
        url: `record_xiangqing.php?sid=${sid}`
    });
}

export function postCj() {
    return http<any>({
        method: 'POST',
        url: `choujiang_ok.php`
    });
}

export function postShop(id: string) {
    return http<any>({
        method: 'POST',
        url: `shop_ing.php?id=${id}`
    });
}

// 购买理财
export function postGreat(bianhao: string, moneys: string) {
    return http<any>({
        method: 'POST',
        url: `great_add.php?bianhao=${bianhao}&moneys=${moneys}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function userPic(con: string) {
    return http<any>({
        method: 'POST',
        url: `user_pic.php`,
        data: {
            con
        }
    });
}

//钱包转入余额POST /user/intobalanc
export function intobalance(money: string) {
    return http<any>({
        method: 'POST',
        url: `yuebao_zhuanru.php?moneys=${money}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//转出
export function outbalance(money: string) {
    return http<any>({
        method: 'POST',
        url: `yuebao_zhuanchu.php?moneys=${money}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
/**划转金额
    money       划转金额
    from        转出账户（benjin0或benjin1）
    to          转入账户（benjin0或benjin1）
*/
export function huazhuan(money: string, from: string, to: string) {
    return http<any>({
        method: 'POST',
        url: `huazhuan.php?money=${money}&from=${from}&to=${to}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//获取银行支付信息/user/offlinelist
export function offlinelist() {
    return http<any>({
        method: 'POST',
        url: `offlinelist.php`
    });
}

//获取咨询详情
export function getZixun(id: string) {
    return http<any>({
        method: 'POST',
        url: `zixun.php?id=${id}`
    });
}

//获取银行卡信息
export function getbankinfo() {
    return http<any>({
        method: 'POST',
        url: `usebank.php`
    });
}

//获取公告信息

export function getNotice(lx: string) {
    return http<any>({
        method: 'GET',
        url: `gonggao.php?lx=${lx}`
    });
}

export function getHuodong() {
    return http<any>({
        method: 'GET',
        url: `active.php`
    });
}

export function getHuodongDetail(id: string) {
    return http<any>({
        method: 'GET',
        url: `active_info.php?id=${id}`
    });
}

//获取余额宝
export function getposition() {
    return http<any>({
        method: 'POST',
        url: `yuebao.php`
    });
}

//用户提现  POST /user/withdrawals
export function withdrawals(bankcode: string, bankname: string, bankuser: string, moneys: string, usepwd: string, tday: string) {
    return http<any>({
        method: 'POST',
        url: `tixian.php?bankcode=${bankcode}&bankname=${bankname}&bankuser=${bankuser}&moneys=${moneys}&usepwd=${usepwd}&tday=${tday}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export function withdrawalsusdt(usdtlx: string, usdt: string, moneys: string, usepwd: string, tday: string) {
    return http<any>({
        method: 'POST',
        url: `tixian_usdt.php?usdtlx=${usdtlx}&usdt=${usdt}&moneys=${moneys}&mima=${usepwd}&tday=${tday}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//获取用户信息
export function getuserdetail() {
    return http<any>({
        method: 'GET',
        url: `my.php`
    });
}
export function getaddress() {
    return http<any>({
        method: 'GET',
        url: `shop_dizhi_ok.php`
    });
}

//获取充值流水
export function getstream() {
    return http<any>({
        method: 'GET',
        url: `record_chong.php`
    });
}

//获取提现流水
export function gettxstream() {
    return http<any>({
        method: 'GET',
        url: `record_tixian.php`
    });
}

//获取收支明细
export function getszstream() {
    return http<any>({
        method: 'GET',
        url: `record_mx.php`
    });
}

//获取收支明细
export function getlicaimx() {
    return http<any>({
        method: 'GET',
        url: `record_licai.php`
    });
}
//获取客服连接
export function getkefuurlwithoutlogin(phone:string) {
    return http<any>({
        method: 'GET',
        url: `kefu_url1.php?phone=${phone}`
    });
}
//获取客服连接
export function getkefuurl() {
    return http<any>({
        method: 'GET',
        url: `kefu_url0.php`
    });
}

export function gethdstream() {
    return http<any>({
        method: 'GET',
        url: `record_huodong.php`
    });
}

export function getjfstream() {
    return http<any>({
        method: 'GET',
        url: `record_jifen.php`
    });
}
//获取是否实名认证过
export function getAuthentication() {
    return http<any>({
        method: 'GET',
        url: `certification.php`
    });
}

//实名认证
export function authentication(data: any) {
    return http<any>({
        method: 'POST',
        url: `certification_ok.php`,
        data: {
            realname: data.realname,
            usecode: data.usecode,
            con: data.con,
            con1: data.con1,
            bankcode: data.bankcode,
            bankuser: data.bankuser,
            bankname: data.bankname
        }
    });
}

//设置签到
export function setfollow() {
    return http<any>({
        method: 'POST',
        url: `qiandao.php`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//获取签到奖品列表
export function getsign() {
    return http<any>({
        method: 'POST',
        url: `getsign.php`
    });
}

//获取记录
export function getStrade(lx: string, isok: string) {
    return http<any>({
        method: 'POST',
        url: `record.php?lx=${lx}&isok=${isok}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function getRecord(status: string) {
    return http<any>({
        method: 'POST',
        url: `recordche.php?status=${status}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function getContract(sid: string) {
    return http<any>({
        method: 'POST',
        url: `record_hetong.php?sid=${sid}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//获取分享数据
export function getInvest() {
    return http<any>({
        method: 'GET',
        url: `invest.php`
    });
}

// //充值
export function bankRecharge(moneys: string, con: string, usdt: string, id: string) {
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
export function getＡllZq() {
    return http<any>({
        method: 'GET',
        url: `allzhuanqu.php`
    });
}
export function _getXmlist(zqid: string) {
    return http<any>({
        method: 'GET',
        url: `getxmlist.php?id=${zqid}`
    });
}

export function getOneDh(zqid: string, id: string) {
    return http<any>({
        method: 'GET',
        url: `orderche.php?zqid=${zqid}&id=${id}`
    });
}
export function _buypro(zqid: number, id: number, moneys: string, qishu: number, day: number, bankid: number) {
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
export function getXindaiTab() {
    return http<any>({
        method: 'GET',
        url: `xindai_zhuanqu.php`
    });
}
//获取信贷页面
export function getXindai(id: string, shuoming: string) {
    return http<any>({
        method: 'GET',
        url: `xindai.php?id=${id}&lx=${shuoming}`
    });
}

export function getZhanche(zqid: string) {
    return http<any>({
        method: 'GET',
        url: `order.php?zqid=${zqid}`
    });
}
//获取抽奖信息
export function getLottery() {
    return http<any>({
        method: 'POST',
        url: `choujiang.php`
    });
}
export function getLotte() {
    return http<any>({
        method: 'POST',
        url: `choujiang_mx.php `
    });
}

//抽奖发送后台
export function postLottery() {
    return http<any>({
        method: 'GET',
        url: `choujiang_ok.php`
    });
}

//获取代付订单信息
export function getOrderInfo(bianhao: string) {
    return http<any>({
        method: 'GET',
        url: `order.php?zqid=${bianhao}`
    });
}

//获取代付订单信息
export function getOrderInfo2(bianhao: string) {
    return http<any>({
        method: 'GET',
        url: `orderche.php?id=${bianhao}`
    });
}

//发送订单信息
export function postOrder(zid: string, moneys: string, days: string) {
    return http<any>({
        method: 'POST',
        url: `order_ok.php?zid=${zid}&moneys=${moneys}&days=${days}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function postOrder2(id: string, moneys: string, days: string, lixi: string) {
    return http<any>({
        method: 'POST',
        url: `order_ok.php?zid=${id}&moneys=${moneys}&days=${days}&lixi=${lixi}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
//修改登录密码
export function modifypwd(usepwd: string, newpwd: string, name: string, usecode: string, okpwd: string) {
    return http<any>({
        method: 'POST',
        url: `mod_pwd.php?usepwd=${usepwd}&newpwd=${newpwd}&okpwd=${okpwd}&name=${name}&usecode=${usecode}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//获取信贷页面
export function getXindaiTitle(id: string) {
    return http<any>({
        method: 'GET',
        url: `xindai_title.php?id=${id}`
    });
}

//获取客服
export function getapistrade() {
    return http<any>({
        method: 'POST',
        url: `kefu_about.php`
    });
}

//获取客服
export function getHelpcon(id: string) {
    return http<any>({
        method: 'POST',
        url: `kefu_about_info.php?id=${id}`
    });
}

//获取关于我们
export function getAboutus() {
    return http<any>({
        method: 'GET',
        url: `aboutus.php`
    });
}

//忘记密码POST
export function forgetpwd(usename: string, yzm: string, usepwd: string) {
    return http<any>({
        method: 'POST',
        url: `forget.php?usename=${usename}&yzm=${yzm}&usepwd=${usepwd}&okpwd=${usepwd}`,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//获取用户协议
export function getagreement() {
    return http<any>({
        method: 'POST',
        url: `/user/agreement`
    });
}

//校验图形验证码
export function checkimg(input: string) {
    return http<any>({
        method: 'POST',
        url: `/common/img/check&input=${input}`
    });
}

//删除自选股票POST /user/deleteselection
export function delselectionlist(ticker: string) {
    return http<any>({
        method: 'POST',
        url: `/user/deleteselection?ticker=${ticker}`
    });
}

//添加自选股票POST /user/addselection
export function addselectionlist(ticker: string) {
    return http<any>({
        method: 'POST',
        url: `/user/addselection?ticker=${ticker}`
    });
}

//用户红包
export function getredpacket() {
    return http<any>({
        method: 'POST',
        url: `/user/redpacket`
    });
}

//获取多个股票信息数据
export function getgpinfodatas(ticker: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/stock/quotations`,
        data: ticker
    });
}

//一元体验创建POST /trade/one/create
export function setoneconfig(ticker: string, quantity: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/one/create?ticker=${ticker}&quantity=${quantity}`
    });
}

//获取交易时间
export function getgptime() {
    return http<any>({
        method: 'POST',
        url: `/trade/tradetime`
    });
}

//获取交易限制
export function getapitrade() {
    return http<any>({
        method: 'POST',
        url: `/api/Trade`
    });
}

//获取token失效
export function getapiuser() {
    return http<any>({
        method: 'POST',
        url: `/api/User`
    });
}

//获取热门股票
export function gethotstock() {
    return http<any>({
        method: 'POST',
        url: `/user/hotstock`
    });
}
//查找股票
export function getstocklist(keyword: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/stocklist?keyword=${keyword}`
    });
}

//资金重置
export function tradereset() {
    return http<any>({
        method: 'POST',
        url: `/track/reset`
    });
}

//获取战绩详情POST /track/recorduser
export function getrecorduser(id: string) {
    return http<any>({
        method: 'POST',
        url: `/track/recorduser?id=${id}`
    });
}

//取消关注 POST /track/unfollow
export function unfollow(id: string) {
    return http<any>({
        method: 'POST',
        url: `/track/unfollow?id=${id}`
    });
}

//获取所有关注人持仓POST /track/followuserposition
export function getallposition(page: any) {
    return http<any>({
        method: 'POST',
        url: `/track/followuserposition`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}

//获取关注人模拟记录POST /track/history
export function gethistory(id: string, page: any) {
    return http<any>({
        method: 'POST',
        url: `/track/history?id=${id}`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}
//获取所有关注人POST /track/followuser
export function getfollowuser() {
    return http<any>({
        method: 'POST',
        url: `/track/followuser`
    });
}

//获取银行卡POST /user/bankcard
export function getBank() {
    return http<any>({
        method: 'POST',
        url: `/user/bankcard`
    });
}

//银行支付/user/addofflinerecharge
export function addofflinerecharge(id: string, Amount: string, UserAccount: string) {
    return http<any>({
        method: 'POST',
        url: `/user/addofflinerecharge`,
        data: {
            Id: id,
            Amount: Amount,
            UserAccount: UserAccount
            //OrderNumber:OrderNumber
        }
    });
}

//充值Pay/PayResult
// const payresult = (userid,amount,paytype) =>axios.post(url+"/Pay/PayResult?userid="+userid+"&amount="+amount+"&paytype="+paytype,{},{
//     headers: {
//         'token':
//     }
// })
export function payresult(userid: string, amount: string, paytype: string) {
    return http<any>({
        method: 'POST',
        url: `/Pay/PayResult?userid=${userid}&amount=${amount}&paytype=${paytype}`,
        header: {
            token: 'F4C79301081D42AFA77E2AC8D52D2495',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//绑定银行卡 /user/bankcard/create
export function bankcard(BankCardNo: string, BankName: string, BranchName: string) {
    return http<any>({
        method: 'POST',
        url: `/user/bankcard/create`,
        data: {
            BankCardNo: BankCardNo,
            BankName: BankName,
            BranchName: BranchName
        }
    });
}

//获取持仓策略
export function gettradeposition(page: any) {
    return http<any>({
        method: 'POST',
        url: `/trade/position`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}
//获取历史策略
export function gethistorytrade(page: any) {
    return http<any>({
        method: 'POST',
        url: `/trade/history`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}

//获取股票信息数据
export function getgpinfodata(ticker: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/stock/quotation?ticker=${ticker}`
    });
}

//获取股票配置 POST /trade/stock/config
export function stockconfig(ticker: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/stock/config?ticker=${ticker}`
    });
}

//创建策略POST /trade/create
export function createtrade(ticker: string, quantity: string, bond: string, multiple: string, loss: string, plus: string, autoadd: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/create?ticker=${ticker}&quantity=${quantity}&bond=${bond}&multiple=${multiple}&loss=${loss}&plus=${plus}&autoadd=${autoadd}`
    });
}
//修改止盈止损POST /trade/contract/price
export function contractprice(conid: string, loss: string, plus: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/contract/price?conid=${conid}&loss=${loss}&plus=${plus}`
    });
}
//追加保证金POST /trade/contract/addbond
export function addbond(conid: string, price: string, autoadd: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/contract/addbond?conid=${conid}&price=${price}&autoadd=${autoadd}`
    });
}
//平仓卖出POST /trade/contract/sell
export function sell(conid: string) {
    return http<any>({
        method: 'POST',
        url: `/trade/contract/sell?conid=${conid}`
    });
}

//获取持仓策略
export function s_gettradeposition(page: any) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/position`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}
//获取历史策略
export function s_gethistorytrade(page: any) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/history`,
        data: {
            PageNumber: page.PageNumber,
            PageSize: page.PageSize
        }
    });
}

//创建策略POST /trade/create
export function s_createtrade(ticker: string, quantity: string, bond: string, multiple: string, loss: string, plus: string, autoadd: string) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/create?ticker=${ticker}&quantity=${quantity}&bond=${bond}&multiple=${multiple}&loss=${loss}&plus=${plus}&autoadd=${autoadd}`
    });
}

//修改止盈止损POST /trade/contract/price
export function s_contractprice(conid: string, loss: string, plus: string) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/contract/price?conid=${conid}&loss=${loss}&plus=${plus}`
    });
}
//追加保证金POST /trade/contract/addbond
export function s_addbond(conid: string, price: string, autoadd: string) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/contract/addbond?conid=${conid}&price=${price}&autoadd=${autoadd}`
    });
}
//平仓卖出POST /trade/contract/sell
export function s_sell(conid: string) {
    return http<any>({
        method: 'POST',
        url: `/simulationtrade/contract/sell?conid=${conid}`
    });
}

export function delbankinfo(id: string) {
    return http<any>({
        method: 'POST',
        url: `/user/bankcard/delete?cardno=${id}`
    });
}
//添加usdt的提现地址
export function addtrc20address(usdt_trc20_address: string = '') {
    return http<any>({
        method: 'GET',
        url: `trc20address.php?act=add&usdt_trc20_address=${usdt_trc20_address}`
    });
}

//获取usdt的提现地址
export function gettrc20address() {
    return http<any>({
        method: 'GET',
        url: `trc20address.php?act=view`
    });
}
// 转账
export function transfer(money: number, touser: string, password: string) {
    return http<any>({
        method: 'POST',
        url: `transfer.php?money=${money}&touser=${touser}&password=${password}`,
        
    });
}

// 转账记录
export function getTransferRecords(params: { status?: number; size: number; page: number }) {
    const { status, size, page } = params;
    const statusQuery = typeof status === 'number' ? `&status=${status}` : '';
    return http<any>({
        method: 'GET',
        url: `transfer_records.php?size=${size}&page=${page}${statusQuery}`
    });
}

export function getTixianCfg() {
    return http<any>({
        method: 'GET',
        url: `tixian_cfg.php`
    });
}