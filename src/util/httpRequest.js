import axios from 'axios'
import router from "@/router";
import store from "@//store";


const http = axios.create({
    // baseURL: 'http://192.168.0.71:8080/',
    baseURL: 'http://996gg.xyz/',
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'content-type': 'application/json; charset=UTF-8'
    }
})
// 请求拦截
http.interceptors.request.use((config) => {
    console.log('请求拦截', config)
    if (localStorage.getItem('Authorization')) {
        config.headers['Authorization'] = localStorage.getItem('Authorization')
    }
    // config.headers['Authorization'] = cookie.getCookie('Authorization')
    return config
}, error => {
    console.log('请求拦截错误')
    return Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(response => {
    console.log('响应', response)
    return response
}, error => {
    console.log('响应拦截错误', error)

    switch (error.response.status) {
        case 400:
            ElMessage({
                message: error.response.data,
                type: 'error',
                duration: 1500,
                customClass: 'element-error-message-zindex'
            })
            break
        case 401:
            ElMessage({
                message: '您还未登录',
                type: 'error',
                duration: 1500,
                customClass: 'element-error-message-zindex'
            })
            localStorage.clear()
            router.push({
                path: '/'
            })
            store.setNickName()
            break
        case 405:
            ElMessage({
                message: 'http请求方式有误',
                type: 'error',
                duration: 1500,
                customClass: 'element-error-message-zindex'
            })
            break
        case 500:
            ElMessage({
                message: '服务器出了点小差，请稍后再试',
                type: 'error',
                duration: 1500,
                customClass: 'element-error-message-zindex'
            })
            break
        case 501:
            ElMessage({
                message: '服务器不支持当前请求所需要的某个功能',
                type: 'error',
                duration: 1500,
                customClass: 'element-error-message-zindex'
            })
            break
    }
    return Promise.reject(error)
})


export default http
