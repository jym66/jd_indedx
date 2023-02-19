import {createRouter, createWebHashHistory} from 'vue-router'
import index from "@/view/index"
import login from '@/view/login/login'
import goodList from "@/view/goodList/goodsList";
import goodsDetail from "@/view/goodsDetail/goodsDetail";
import store from "@/store";
import order from "@//view/mySelf/order";
import confirm_order from "@/view/order/confirm_order";
import payPage from "@/view/order/payPage";
import test from "@/view/test";
import self from "@/view/mySelf/self";
import account from "@//view/mySelf/account";
import password from "@//view/mySelf/password";
import address from "@//view/mySelf/address";
import car from "@//view/shoppingCar/car";
import register from "@//view/register/register";
import comment from "@//view/comments/comment";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            component: index,
            meta: {
                needLogin: false
            }
        },
        {
            path: '/login',
            component: login,
            props: route => ({query: route.query.redirect}),
            meta: {
                needLogin: false
            }
        },
        {
            path: '/goodList',
            component: goodList,
            meta: {
                needLogin: false
            },
            props: route => ({query: route.query.q})
        },
        {
            path: '/goodsDetail',
            component: goodsDetail,
            props: route => ({query: route.query.prodId}),
            meta: {
                needLogin: false
            }
        },
        {
            path:"/comments",
            component:comment,
            meta:{
                needLogin: false
            }
        },
        {
            path: '/self',
            component: self,
            redirect:'/self/order',
            children:[
                {
                    path:'order',
                    component:order
                },
                {
                    path:'account',
                    component:account
                },
                {
                    path:'password',
                    component:password
                },
                {
                    path:'address',
                    component:address
                },
            ],
            meta: {
                needLogin: true
            }
        },
        {
            path: '/confirmOrder',
            component: confirm_order,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/pay',
            component: payPage,
            meta: {
                needLogin: true
            }
        },
        {
            path:'/test',
            component:test,
            meta: {
                needLogin: false
            }
        },
        {
            path:'/car',
            component:car,
            meta: {
                needLogin: true
            }
        },
        {
            path:"/reg",
            component:register,
            meta: {
                needLogin: false
            }
        }
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin && !store.getAuth()) {
        console.log('路由守卫检测到没登陆');
        next({path: '/login', query: {redirect: to.fullPath}})
    } else {
        console.log(to.path);
        next()
    }
})
export default router


