import { UserLayout, BasicLayout, BlankLayout, PageView } from '@Two/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
export const managerRouterMap = [
  {
    path: '/',
    name: 'Two',
    component: BasicLayout,
    meta: { title: 'index' },
    redirect: '/first',
    children: [
      {
        path: '/first',
        name: 'first',
        component: () => import(/* webpackChunkName: "two" */ '@Two/views/first/index'),
        meta: { title: 'first', icon: "home" },
        // children: [
        //   {
        //     path: 'index',
        //     name: 'index',
        //     component: () => import(/* webpackChunkName: "two" */ '@Two/views/someName/index'),
        //     meta: { title: '基础数据', icon: "home" },
        //   }
        // ]
      },

    ]
  }
]