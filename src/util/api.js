import http from "@/util/httpRequest";
//登陆接口 参数用户名和密码
export const loginApi = p => http.post('api/webLogin', p)
//退出登陆
export const logOutApi = () => http.get('api/p/user/logout')
//首页轮播图接口
export const indexImg = () => http.get('api/indexImgs')
//每日疯抢 参数 {current,size}
export const moreBuyProdList = (p) => http.get('api/prod/moreBuyProdList', {params: p})
//每日推荐 参数同上
export const lastedProdPage = (p) => http.get('api/prod/lastedProdPage', {params: p})
//搜索商品 /search/searchProdPage
export const searchProdPage = (p) => http.get('api/search/searchProdPage', {params: p})
//商品详情 参数商品id
export const prodInfo = (p) => http.get('api/prod/prodInfo', {params: p})
//添加评论
export const prodComm = (p) => http.post('api/prodComm', p)
//获取评论
export const prodCommPageByProd = (p) => http.get('api/prodComm/prodCommPageByProd', {params: p})
//获取订单信息
export const myOrder = (p) => http.get('api/p/myOrder/myOrder', {params: p})
//获取用户地址
export const getAddressList = () => http.get('api/p/address/list')
//确认订单
export const confirmOrder = (p) => http.post('api/p/order/confirm', p)
//提交订单
export const submit = (p) => http.post('api/p/order/submit', p)
//支付
export const pay = (p) => http.post('api/p/order/normalPay', p)
//删除订单
export const deleteOrders = (p)=>http.delete('api/p/myOrder/'+p,)
//确认收货
export const receiptOrder = (p)=>http.put('api/p/myOrder/receipt/'+p)
//添加收藏
export const addCollegeApi = (p)=>http.post('api/p/user/collection/addOrCancel',p)
//获取用户信息
export const getUserInfoApi = ()=>http.get('api/p/user/userInfo')
//新增收货地址
export const addAddress = (p)=> http.post('api/p/address/addAddr',p)
//获取省市区
export const getCity = (p)=> http.get('api/p/area/listByPid',{params:p})
//删除地址
export const deleteAdd = (p) =>http.delete('api/p/address/deleteAddr/'+p)

export const setInfo = (p) =>http.put('api/p/user/setUserInfo',p)

export const updatePwd = (p)=>http.put('api/user/updatePwd',p)
//获取购物车信息
export const getCar = (p)=>http.post('api/p/shopCart/info',p)
//计算购物车选中物品价格
export const getCarPrice = (p)=>http.post('api/p/shopCart/totalPay',p)
//修改购物车商品
export const changeItem = (p)=>http.post('api/p/shopCart/changeItem',p)
//删除购物车商品
export const deleteItem = (p)=>http.delete('api/p/shopCart/deleteItem',{data:p})
//注册
export const register = (p)=>http.post("api/user/register",p)
//订单详情
export const orderDetailApi = (p)=>http.get("api/p/myOrder/orderDetail",{params:p})










