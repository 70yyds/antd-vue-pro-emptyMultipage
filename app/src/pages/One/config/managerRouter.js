import { UserLayout, BasicLayout, BlankLayout, PageView } from '@One/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
export const managerRouterMap = [
  {
    path: '/',
    name: 'One',
    component: BasicLayout,
    meta: { title: 'index' },
    redirect: '/second',
    children: [
      {
        path: '/first',
        name: 'first',
        component: () => import(/* webpackChunkName: "one" */ '@One/views/first/index'),
        meta: { title: 'first', icon: "home" },
        // children: [
        //   {
        //     path: 'index',
        //     name: 'index',
        //     component: () => import(/* webpackChunkName: "one" */ '@One/views/someName/index'),
        //     meta: { title: '基础数据', icon: "home" },
        //   }
        // ]
      },
      {
        path: '/second',
        name: 'second',
        component: () => import(/* webpackChunkName: "one" */ '@One/views/second/index'),
        meta: { title: 'second', icon: "home" },
        // children: [
        //   {
        //     path: 'index',
        //     name: 'index',
        //     component: () => import(/* webpackChunkName: "one" */ '@One/views/someName/index'),
        //     meta: { title: '基础数据', icon: "home" },
        //   }
        // ]
      }
    ]
  }
]