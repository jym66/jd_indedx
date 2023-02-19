import {reactive} from "vue";

const store = {
    state: reactive({
        NickName: localStorage.getItem('nickName') ? localStorage.getItem('nickName') : '请登录 免费注册',
        isAuth: !!localStorage.getItem('Authorization'),
        selectInfo: {},
        orderNumber: '',
        //是否从购物车下单
        isCar: false
    }),
    setNickName(value = '请登录 免费注册') {
        console.log('setNickName调用');
        this.state.NickName = value
    },
    getNickName() {
        console.log('getNickName调用');
        return this.state.NickName
    },
    setAuth(value) {
        console.log('setAuth调用');
        this.state.isAuth = value
    },
    getAuth() {
        console.log('getAuth调用');
        return this.state.isAuth
    },
    setSelectInfo(value) {
        this.state.selectInfo = value
    },
    getSelectInfo() {
        return this.state.selectInfo
    },
    getOrderNumber() {
        return this.state.orderNumber
    },
    setOrderNumber(value) {
        this.state.orderNumber = value
    },
    setIsCar(value) {
        this.state.isCar = value
    },
    getIsCar() {
        return this.state.isCar
    }
}
export default store