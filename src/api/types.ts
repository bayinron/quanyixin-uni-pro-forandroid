export interface SearchRequest {
    /**
     * 关键字（需要限制输入50个字以内）
     */
    keyWord: string;
    /**
     * 当前页
     */
    page: number;
    /**
     * 内页请求数量
     */
    size?: string;
    /**
     * 微信号
     */
    wxCode: string;
    /**
     * 企业名称
     */
    cyName?: string;
}
export interface AreaVO {
    code: string;
    name: string;
    pcode: string;
    id?: string;
    rmk?: string;
    status?: number;
    updateTime?: string;
    updateUser?: string;
    createTime?: string;
    createUser?: string;
    leaf?: boolean;
    children?: AreaVO[];
}
/**
 * 登录请求参数
 */
export interface LoginData {
    /**
     * 用户名
     */
    aa: string;
    /**
     * 密码
     */
    bb: string;
    /**验证码 */
    cc?: string;
}

export interface BusinessRecord {
    code: string;
    cyName: string;
    cySname: string;
    description: string;
    grade: number;
    hyCodes: string;
    hyCodesStar: string;
    name: string;
    orderid: string;
    relationCode: string;
    classifies: ClassifiVO[];
}
interface ClassifiVO {
    code: string;
    name: string;
}
export interface IndustryRecord {
    category: string;
    code: string;
    cyInfo: CyInfo[];
    cySnames: string;
    des: string;
    grade: string;
    industryDivide: string;
    name: string;
    relationCode: string;
    tid: string;
    classifies: ClassifiVO[];
}

export interface CareerRecord {
    code: string;
    description: string;
    grade: number;
    name: string;
    orderid: string;
    relationCode: null | string;
}
export interface CyInfo {
    cname: string;
    relations: Relation[];
    star: number;
}

export interface Relation {
    cyCode: string;
    cyName: string;
    cyNum: number;
    cySname: string;
    hasStar: string;
    hyCode: string;
    hyName: string;
    id: string;
}
export interface IndustryDetailVo {
    code?: string;
    cyName?: string;
    cySname?: string;
    description?: string;
    grade?: number;
    name?: string;
    orderid?: string;
    relationCode?: string;
    hyCodesStar?: string;
    classifies: ClassifiVO[];
}

export interface BusinessDetailVo {
    category?: string;
    code?: string;
    cySname?: string;
    des?: string;
    grade?: string;
    industryDivide?: string;
    name?: string;
    relationCode?: string;
    tid?: string;

    title?: string;
    classifies: ClassifiVO[];
}

export interface CareerRecord {
    code: string;
    description: string;
    grade: number;
    name: string;
    orderid: string;
    relationCode: null | string;
    classifies: ClassifiVO[];
}
export interface AreaRecord {
    cxCode: string;
    flag: number;
    jiedao: string;
    jiedaoCode: string;
    qu: string;
    quCode: string;
    sheng: string;
    shengCode: string;
    shi: string;
    shiCode: string;
    theCode: string;
    theJwh: string;
}

//way 页面标志（1:行业查询，2:产业查询，3:职业查询，4:区划查询）
export enum WayEnum {
    HY = 1,
    CY = 2,
    ZY = 3,
    QH = 4
}
export interface UserInfo {
    result: string;
    uselevel: string;
    benjin: string;
    phone: string;
    renzheng: string;
    benjin_keyong: number;
    pay_pwd: string;
    shu: number;
    fenrun: string;
    teamfenrun: string;
    yesfenrun: string;
    tixian_min: string;
    tixian_sel: string[];
}